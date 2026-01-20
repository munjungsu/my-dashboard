'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import './map_canvas.scss';

interface MapCanvasProps {
    mapUrl?: string;
}

interface ViewState {
    zoom: number;
    panX: number;
    panY: number;
}

const MapCanvas = ({ mapUrl = '/data/Map1.pgm' }: MapCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mapImageRef = useRef<HTMLCanvasElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mapData, setMapData] = useState<{
        width: number;
        height: number;
        pixels: Uint8Array;
        maxVal: number;
        negate: number; // 0 또는 1
    } | null>(null);
    
    // 줌 및 패닝 상태
    const [viewState, setViewState] = useState<ViewState>({
        zoom: 1,
        panX: 0,
        panY: 0
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // PGM 파일 파싱 함수
    const parsePGM = async (buffer: ArrayBuffer) => {
        const data = new Uint8Array(buffer);
        let offset = 0;

        // 헤더 파싱을 위한 문자열 변환
        const textDecoder = new TextDecoder('ascii');
        const headerText = textDecoder.decode(data.slice(0, Math.min(1000, data.length)));
        const lines = headerText.split('\n');

        let width = 0;
        let height = 0;
        let maxVal = 255;
        let headerLines = 0;
        let isBinary = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // 주석 무시
            if (line.startsWith('#')) {
                headerLines++;
                continue;
            }

            // 매직 넘버 확인
            if (line === 'P5') {
                isBinary = true;
                headerLines++;
                continue;
            } else if (line === 'P2') {
                isBinary = false;
                headerLines++;
                continue;
            }

            // 크기 파싱
            if (width === 0) {
                const parts = line.split(/\s+/);
                if (parts.length >= 2) {
                    width = parseInt(parts[0], 10);
                    height = parseInt(parts[1], 10);
                    headerLines++;
                    continue;
                }
            }

            // 최대값 파싱
            if (width > 0 && maxVal === 255) {
                maxVal = parseInt(line, 10);
                headerLines++;
                break;
            }
        }

        // 헤더 바이트 수 계산
        let headerBytes = 0;
        let newlineCount = 0;
        for (let i = 0; i < data.length && newlineCount < headerLines; i++) {
            if (data[i] === 10) { // '\n'
                newlineCount++;
            }
            headerBytes = i + 1;
        }

        // 픽셀 데이터 추출
        const pixelData = data.slice(headerBytes);
        
        return {
            width,
            height,
            maxVal,
            pixels: pixelData,
            isBinary
        };
    };

    // PGM 파일 로드
    useEffect(() => {
        const loadMap = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(mapUrl);
                if (!response.ok) {
                    throw new Error(`Failed to load map: ${response.status}`);
                }

                const buffer = await response.arrayBuffer();
                const pgmData = await parsePGM(buffer);

                setMapData({
                    width: pgmData.width,
                    height: pgmData.height,
                    pixels: pgmData.pixels,
                    maxVal: pgmData.maxVal,
                    negate: 0 // 기본값: 반전 안함
                });

                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load map');
                setLoading(false);
            }
        };

        loadMap();
    }, [mapUrl]);

    // 맵 이미지 생성 (한 번만)
    useEffect(() => {
        if (!mapData) return;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = mapData.width;
        tempCanvas.height = mapData.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        const imageData = tempCtx.createImageData(mapData.width, mapData.height);
        const { width, height, pixels, maxVal, negate } = mapData;
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const dataIndex = y * width + x;
                
                const value = pixels[dataIndex];
                
                // PGM 값을 0-1 범위로 정규화
                let normalizedValue = value / maxVal;
                
                // negate가 1이면 값을 반전
                if (negate === 1) {
                    normalizedValue = 1.0 - normalizedValue;
                }
                
                // OccupancyGrid 변환
                let occupancyValue: number;
                if (normalizedValue < 0.3) {
                    occupancyValue = 100; // 장애물
                } else if (normalizedValue > 0.9) {
                    occupancyValue = 0; // 빈 공간
                } else {
                    occupancyValue = -1; // 알 수 없는 영역
                }
                
                // OccupancyGrid와 동일한 색상 매핑 적용
                let color: [number, number, number, number];
                if (occupancyValue === -1) {
                    // 알 수 없는 영역 (회색)
                    color = [128, 128, 128, 255];
                } else if (occupancyValue === 0) {
                    // 빈 공간 (흰색)
                    color = [255, 255, 255, 255];
                } else {
                    // 장애물 (검은색)
                    color = [0, 0, 0, 255];
                }
                
                const pixelIndex = dataIndex * 4;
                imageData.data[pixelIndex] = color[0];
                imageData.data[pixelIndex + 1] = color[1];
                imageData.data[pixelIndex + 2] = color[2];
                imageData.data[pixelIndex + 3] = color[3];
            }
        }

        tempCtx.putImageData(imageData, 0, 0);
        mapImageRef.current = tempCanvas;
        
        // 강제 리렌더링
        setViewState(prev => ({ ...prev }));
    }, [mapData]);

    // 렌더링 함수
    const renderMap = useCallback(() => {
        if (!canvasRef.current || !containerRef.current || !mapImageRef.current || !mapData) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Canvas 크기 설정 (컨테이너에 맞춤, 고정)
        if (canvas.width !== containerWidth || canvas.height !== containerHeight) {
            canvas.width = containerWidth;
            canvas.height = containerHeight;
        }

        // 기본 스케일 계산 (비율 유지)
        const baseScaleX = containerWidth / mapData.width;
        const baseScaleY = containerHeight / mapData.height;
        const baseScale = Math.min(baseScaleX, baseScaleY);

        // 줌 적용
        const scale = baseScale * viewState.zoom;

        const scaledWidth = mapData.width * scale;
        const scaledHeight = mapData.height * scale;
        
        // 중앙 정렬 + 패닝 오프셋
        const offsetX = (containerWidth - scaledWidth) / 2 + viewState.panX;
        const offsetY = (containerHeight - scaledHeight) / 2 + viewState.panY;

        // 배경색 - 밝은 회색
        ctx.fillStyle = 'rgba(128, 128, 128, 255)';
        ctx.fillRect(0, 0, containerWidth, containerHeight);

        // 맵 이미지 그리기
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(mapImageRef.current, offsetX, offsetY, scaledWidth, scaledHeight);
    }, [mapData, viewState]);

    // Canvas에 지도 렌더링
    useEffect(() => {
        renderMap();
    }, [renderMap]);

    // 리사이즈 핸들러
    useEffect(() => {
        const handleResize = () => {
            renderMap();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [renderMap]);

    // 마우스 휠 줌
    const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        const container = containerRef.current;
        if (!container || !mapData) return;

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // 줌 팩터 계산
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.min(Math.max(viewState.zoom * zoomFactor, 0.5), 5);
        
        // 마우스 포인터 위치 기준 줌
        const zoomRatio = newZoom / viewState.zoom;
        const containerCenterX = container.clientWidth / 2;
        const containerCenterY = container.clientHeight / 2;
        
        const newPanX = mouseX - (mouseX - viewState.panX - containerCenterX) * zoomRatio - containerCenterX + viewState.panX;
        const newPanY = mouseY - (mouseY - viewState.panY - containerCenterY) * zoomRatio - containerCenterY + viewState.panY;

        setViewState({
            zoom: newZoom,
            panX: viewState.panX + (newPanX - viewState.panX) * (zoomRatio - 1) / zoomRatio,
            panY: viewState.panY + (newPanY - viewState.panY) * (zoomRatio - 1) / zoomRatio
        });
    }, [viewState, mapData]);

    // 마우스 드래그 패닝
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - viewState.panX, y: e.clientY - viewState.panY });
    }, [viewState]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        
        setViewState(prev => ({
            ...prev,
            panX: e.clientX - dragStart.x,
            panY: e.clientY - dragStart.y
        }));
    }, [isDragging, dragStart]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    // 줌 리셋
    const handleResetView = useCallback(() => {
        setViewState({ zoom: 1, panX: 0, panY: 0 });
    }, []);

    return (
        <div 
            className="mapCanvas" 
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
            {loading && (
                <div className="loadingOverlay">
                    <span>지도 로딩 중...</span>
                </div>
            )}
            {error && (
                <div className="errorOverlay">
                    <span>지도 로드 실패: {error}</span>
                </div>
            )}
            <canvas ref={canvasRef} />
            <div className="zoomControls">
                <button onClick={() => setViewState(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.2, 5) }))}>+</button>
                <span>{Math.round(viewState.zoom * 100)}%</span>
                <button onClick={() => setViewState(prev => ({ ...prev, zoom: Math.max(prev.zoom * 0.8, 0.5) }))}>−</button>
                <button onClick={handleResetView}>↺</button>
            </div>
        </div>
    );
};

export default MapCanvas;
