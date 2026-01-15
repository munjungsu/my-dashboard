'use client';
import React, { useState } from 'react';
import './device_list.scss';
import { Device, DeviceDetail, DeviceListProps } from '../../types/type';

const DeviceList = ({ deviceData }: DeviceListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

    // 상세 정보 데이터 (선택된 디바이스에 따라 동적으로 변경 가능)
    const deviceDetailData: DeviceDetail = {
        currentLocation: 'AREA_B_node_30',
        currentDestination: 'AREA_A_node_301',
        destinationChange: 'AREA_A_node_301',
        battery: '87 %',
        loadedWeight: '10 kg',
        temperature: '40.9°C',
        commStatus: '10',
        errorCode: '-1',
        currentTask: '빈 박스 저장',
        currentAction: 'Move',
        drivingStatus: 'Moving',
        finalDestination: '스마트스토커-A 2번 포트',
        remainingTime: '약 1분 24초',
        torqueFree: 'Off',
        ems: 'Off',
        robotPosition: '[10.0, 20.0, 0.0]',
        targetSpeed: '[1.0, 20.0, 0.5]',
        currentSpeed: '[1.0, 20.0, 0.5]',
        deviceId: 'FLT-W03-0005',
        deviceModelName: 'THIRA L500',
        deviceType: 'Fork Lift (W3)',
        robotType: '가상 로봇',
        manufactureDate: '2024-12-01T00:00:00.000Z',
        installLocation: 'A공장 파운드리 2라인',
        task: '이동(팽치, 경사) / 조작(Lift)',
        lastInspectionDate: '2025-12-09T16:00:00.000Z',
        swVersion: 'STAR : v1.0.1 / Motor Driver : v1.0.3',
        shape: 'Rectangle',
        diameter: '-',
        width: '1,000 mm',
        length: '1,200 mm',
        frontLength: '600 mm',
        sideLength: '500 mm',
        vertices: '-',
        height: '1,400 mm',
        drivingType: 'DD / MDX-500 / 0.6 m',
        consoleLogLevel: 'Info',
        fileLogLevel: 'Error',
        moduleImageDisplay: 'On',
        maxLoad: '50 kg',
        maxDrivingSpeed: '1.0 m/s',
        emergencyStopDistance: '0.5 m',
        lidarRange: '30',
        cameraResolution: '1920 × 1080',
        cameraFov: '140 °',
    };

    const filteredDevices = deviceData.filter(device => 
        device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.modelName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeviceClick = (device: Device) => {
        setSelectedDevice(device);
    };

    return (
        <div className="device_list">
            <div className="leftPanel">
                <div className="headerWrap">
                    <div className="searchBox">
                        <span className="searchIcon"><img src="/images/search.svg " /></span>
                        <input 
                            type="text" 
                            placeholder="ID, 모델명 검색" 
                            className="searchInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="registerBtn">+ 디바이스 등록</button>
                </div>
                <div className="tableWrap">
                    <table className="deviceTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>모델명</th>
                                <th>상태</th>
                                <th>현재 위치</th>
                                <th>그룹</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDevices.map((device) => (
                                <tr 
                                    key={device.id}
                                    onClick={() => handleDeviceClick(device)}
                                    className={selectedDevice?.id === device.id ? 'selected' : ''}
                                >
                                    <td className="deviceId">{device.id}</td>
                                    <td className="modelName">{device.modelName}</td>
                                    <td>
                                        <span className={`statusText ${device.statusClass}`}>{device.status}</span>
                                    </td>
                                    <td className="location">{device.currentLocation}</td>
                                    <td className="group">{device.group}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="tableFooter">
                    <span className="totalCount">총 {filteredDevices.length}개의 장치</span>
                </div>
            </div>
            <div className="rightPanel">
                {selectedDevice ? (
                    <div className="deviceDetail">
                        <div className="detailHeader">
                            <div className="deviceIcon"></div>
                            <span className="deviceId">{selectedDevice.id}</span>
                            <button className="refreshBtn">↻ 실시간 데이터 갱신</button>
                        </div>

                        <div className="locationSection">
                            <h3 className="sectionTitle">장치 위치 (실시간)</h3>
                            <div className="locationInfo">
                                <div className="locationRow">
                                    <span className="label">현재 위치</span>
                                    <span className="label">현재 목적지</span>
                                    <span className="label">목적지 변경</span>
                                </div>
                                <div className="locationRow values">
                                    <span className="value">{deviceDetailData.currentLocation}</span>
                                    <span className="value">{deviceDetailData.currentDestination}</span>
                                    <span className="destBadge">작업 중지</span>
                                    <select className="destSelect">
                                        <option>{deviceDetailData.destinationChange}</option>
                                    </select>
                                    <button className="sendBtn">목적지 전송/실행</button>
                                </div>
                            </div>
                        </div>

                        <div className="detailContent">
                            <div className="imageSection">
                                <div className="deviceImage"></div>
                            </div>
                            <div className="infoSection">
                                <div className="infoGroup">
                                    <h4 className="groupTitle">실시간 상세 정보</h4>
                                    <div className="infoRow"><span className="label">배터리</span><span className="value">{deviceDetailData.battery}</span></div>
                                    <div className="infoRow"><span className="label">적재된 무게</span><span className="value">{deviceDetailData.loadedWeight}</span></div>
                                    <div className="infoRow"><span className="label">온도</span><span className="value">{deviceDetailData.temperature}</span></div>
                                    <div className="infoRow"><span className="label">통신 상태(SNR)</span><span className="value">{deviceDetailData.commStatus}</span></div>
                                    <div className="infoRow"><span className="label">에러 코드</span><span className="value">{deviceDetailData.errorCode}</span></div>
                                </div>
                                <div className="infoGroup">
                                    <h4 className="groupTitle">실시간 주행 정보</h4>
                                    <div className="infoRow"><span className="label">수행중인 업무</span><span className="value">{deviceDetailData.currentTask}</span></div>
                                    <div className="infoRow"><span className="label">현재 Action</span><span className="value">{deviceDetailData.currentAction}</span></div>
                                    <div className="infoRow"><span className="label">현재 수행 상태</span><span className="value">{deviceDetailData.drivingStatus}</span></div>
                                    <div className="infoRow"><span className="label">최종 목적지</span><span className="value">{deviceDetailData.finalDestination}</span></div>
                                    <div className="infoRow"><span className="label">남은 주행 시간</span><span className="value">{deviceDetailData.remainingTime}</span></div>
                                    <div className="infoRow"><span className="label">토크 프리</span><span className="value">{deviceDetailData.torqueFree}</span></div>
                                    <div className="infoRow"><span className="label">EMS</span><span className="value">{deviceDetailData.ems}</span></div>
                                    <div className="infoRow"><span className="label">로봇 위치 및 자세</span><span className="value">{deviceDetailData.robotPosition}</span></div>
                                    <div className="infoRow"><span className="label">목표 속도/각속도</span><span className="value">{deviceDetailData.targetSpeed}</span></div>
                                    <div className="infoRow"><span className="label">현재 속도/각속도</span><span className="value">{deviceDetailData.currentSpeed}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="bottomSection">
                            <div className="infoColumn">
                                <h4 className="columnTitle">기준 정보 및 관리</h4>
                                <div className="infoRow"><span className="label">장치 ID</span><span className="value">{deviceDetailData.deviceId}</span></div>
                                <div className="infoRow"><span className="label">모델명</span><span className="value">{deviceDetailData.deviceModelName}</span></div>
                                <div className="infoRow"><span className="label">장치 종류</span><span className="value">{deviceDetailData.deviceType}</span></div>
                                <div className="infoRow"><span className="label">로봇 종류</span><span className="value">{deviceDetailData.robotType}</span></div>
                                <div className="infoRow"><span className="label">제조일</span><span className="value">{deviceDetailData.manufactureDate}</span></div>
                                <div className="infoRow"><span className="label">설치 장소</span><span className="value">{deviceDetailData.installLocation}</span></div>
                                <div className="infoRow"><span className="label">업무</span><span className="value">{deviceDetailData.task}</span></div>
                                <div className="infoRow"><span className="label">마지막 점검일</span><span className="value">{deviceDetailData.lastInspectionDate}</span></div>
                                <div className="infoRow"><span className="label">S/W Ver.</span><span className="value">{deviceDetailData.swVersion}</span></div>
                            </div>
                            <div className="infoColumn">
                                <h4 className="columnTitle">상세 스펙</h4>
                                <div className="infoRow"><span className="label">모양</span><span className="value">{deviceDetailData.shape}</span></div>
                                <div className="infoRow"><span className="label">Diameter</span><span className="value">{deviceDetailData.diameter}</span></div>
                                <div className="infoRow"><span className="label">Width</span><span className="value">{deviceDetailData.width}</span></div>
                                <div className="infoRow"><span className="label">Length</span><span className="value">{deviceDetailData.length}</span></div>
                                <div className="infoRow"><span className="label">Front_Length</span><span className="value">{deviceDetailData.frontLength}</span></div>
                                <div className="infoRow"><span className="label">Side_Length</span><span className="value">{deviceDetailData.sideLength}</span></div>
                                <div className="infoRow"><span className="label">Vertices</span><span className="value">{deviceDetailData.vertices}</span></div>
                                <div className="infoRow"><span className="label">높이</span><span className="value">{deviceDetailData.height}</span></div>
                                <div className="infoRow"><span className="label">주행 타입 / Motor / 휠 베이스</span><span className="value">{deviceDetailData.drivingType}</span></div>
                            </div>
                            <div className="infoColumn">
                                <h4 className="columnTitle">속성</h4>
                                <div className="infoRow"><span className="label">콘솔 로그 정보수준</span><span className="value">{deviceDetailData.consoleLogLevel}</span></div>
                                <div className="infoRow"><span className="label">파일 저장 로그수준</span><span className="value">{deviceDetailData.fileLogLevel}</span></div>
                                <div className="infoRow"><span className="label">모듈 이미지 표시</span><span className="value">{deviceDetailData.moduleImageDisplay}</span></div>
                                <div className="infoRow"><span className="label">최대 적재 중량</span><span className="value">{deviceDetailData.maxLoad}</span></div>
                                <div className="infoRow"><span className="label">최대 주행 속도</span><span className="value">{deviceDetailData.maxDrivingSpeed}</span></div>
                                <div className="infoRow"><span className="label">긴급 정지 거리</span><span className="value">{deviceDetailData.emergencyStopDistance}</span></div>
                                <div className="infoRow"><span className="label">라이다 범위</span><span className="value">{deviceDetailData.lidarRange}</span></div>
                                <div className="infoRow"><span className="label">카메라 해상도</span><span className="value">{deviceDetailData.cameraResolution}</span></div>
                                <div className="infoRow"><span className="label">카메라 시야각</span><span className="value">{deviceDetailData.cameraFov}</span></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="emptyState">
                        <span>디바이스를 선택해주세요</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceList;