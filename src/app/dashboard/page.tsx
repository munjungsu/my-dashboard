'use client';
import './dashboard.scss';
import { CardWrapper } from '../ui/dashboard/cards';
import { useState } from 'react';

const Page = () => {
    const [activeTab, setActiveTab] = useState('event');
    
    return (
       <main className="dashboard">
        <div className="leftPanel">
            <div className="mapContainer">
                <div className="titleWrap">
                    <span className="title">실시간 장치 위치 및 현황 지도</span>
                    <div className="titleActions">
                        <button className="actionBtn active">3D</button>
                        <button className="actionBtn">2D</button>
                        <button className="actionBtn">새로고침</button>
                        <button className="actionBtn">전체화면</button>
                    </div>
                </div>
                <div className="mapWrap">
                    <canvas></canvas>
                </div>
            </div>
            <div className="missionContainer">
                <div className="titleWrap">
                    <div className="titleArea">
                        <span className="title">미션 그룹별 진행 상황</span>
                        <span className="subText">기간/실시간 기준으로 자동 갱신</span>
                    </div>
                    <button className="moreBtn">더보기</button>
                </div>
                <div className="cardWrap">
                    <CardWrapper />
                </div>
            </div>
        </div>
        <div className="rightPanel">
            <div className="actionWrap">
            <span className="title">빠른 액션 메뉴</span>
            <div className="buttonWrap">
                <button>신규 미션 생성</button>
                <button>신규 장치 등록</button>
                <button>전체 경고 소거</button>
            </div>
            </div>
            <div className="dateWrap">
                <div className="titleWrap">
                    <span className="title">기간별 요약지표</span>
                    <div className="periodActions">
                        <button className="periodBtn active">일</button>
                        <button className="periodBtn">주</button>
                        <button className="periodBtn">월</button>
                        <button className="periodBtn">기간선택</button>
                    </div>
                </div>
                <div className="statsWrap">
                    <div className="statCard">
                        <span className="statLabel">완료 미션 수</span>
                        <span className="statValue">6</span>
                    </div>
                    <div className="statCard">
                        <span className="statLabel">취소 미션 수</span>
                        <span className="statValue">0</span>
                    </div>
                    <div className="statCard">
                        <span className="statLabel">알림 건수</span>
                        <span className="statValue">7</span>
                    </div>
                </div>
            </div>
            <div className="totalWrap">
                <span className="title">실시간 요약지표</span>
                <div className="statsGrid">
                    <div className="statCard">
                        <span className="statLabel">전체 미션</span>
                        <span className="statValue">15</span>
                    </div>
                    <div className="statCard">
                        <span className="statLabel">진행중 미션</span>
                        <span className="statValue">4</span>
                    </div>
                    <div className="statCard">
                        <span className="statLabel">대기중 미션</span>
                        <span className="statValue">3</span>
                    </div>
                    <div className="statCard green">
                        <span className="statLabel">온라인 장치</span>
                        <span className="statValue">19/21</span>
                    </div>
                    <div className="statCard">
                        <span className="statLabel">오프라인 장치</span>
                        <span className="statValue">2</span>
                    </div>
                    <div className="statCard green">
                        <span className="statLabel">운행중 장치</span>
                        <span className="statValue">5</span>
                    </div>
                    <div className="statCard yellow">
                        <span className="statLabel">알림</span>
                        <span className="statValue">7</span>
                    </div>
                </div>
            </div>
            <div className="alertWrap">
                <div className="tabWrap">
                    <button className={`tabBtn ${activeTab === 'event' ? 'active' : ''}`} onClick={() => setActiveTab('event')}>최근 이벤트</button>
                    <button className={`tabBtn ${activeTab === 'system' ? 'active' : ''}`} onClick={() => setActiveTab('system')}>시스템 상태 패널</button>
                    <button className={`tabBtn ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>요약지표 상세</button>
                </div>
                
                {/* 최근 이벤트 탭 */}
                {activeTab === 'event' && (
                <div className="alertContent">
                    <div className="alertHeader">
                        <span className="title">실시간 알림 (최근 이벤트)</span>
                    </div>
                    <div className="alertTable">
                        <div className="tableHeader">
                            <span className="col time">Time</span>
                            <span className="col status">Status</span>
                            <span className="col desc">Description</span>
                        </div>
                        <div className="tableBody">
                            <div className="tableRow">
                                <span className="col time">[02:05:10]</span>
                                <span className="col status error">ERROR</span>
                                <span className="col desc">AMR-A01-0002 : 모터 드라이버 통신 오류. 운행 중단.</span>
                            </div>
                            <div className="tableRow">
                                <span className="col time">[02:08:45]</span>
                                <span className="col status alarm">ALARM</span>
                                <span className="col desc">STK-R10-0021 : 비정상적인 온도 상승 감지 (35°C)</span>
                            </div>
                            <div className="tableRow">
                                <span className="col time">[02:10:01]</span>
                                <span className="col status info">INFO</span>
                                <span className="col desc">HBR-M01-0001 : 목적지 AREA_A_node_10 도착 완료.</span>
                            </div>
                            <div className="tableRow">
                                <span className="col time">[02:11:30]</span>
                                <span className="col status info">INFO</span>
                                <span className="col desc">시스템 재부팅 예정 알림. (10분 후)</span>
                            </div>
                            <div className="tableRow">
                                <span className="col time">[02:12:05]</span>
                                <span className="col status alarm">ALARM</span>
                                <span className="col desc">AMR-X-0010 : 배터리 잔량 임계치 이하 (15%)</span>
                            </div>
                            <div className="tableRow">
                                <span className="col time">[02:13:00]</span>
                                <span className="col status error">ERROR</span>
                                <span className="col desc">CNV-M1-1003 : 센서 데이터 불일치. 연결 끊김.</span>
                            </div>
                            <div className="tableRow">
                                <span className="col time">[02:13:30]</span>
                                <span className="col status info">INFO</span>
                                <span className="col desc">FLT-C01-0006 : 작업 재개.</span>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* 시스템 상태 패널 탭 */}
                {activeTab === 'system' && (
                <div className="alertContent systemPanel">
                    <div className="alertHeader">
                        <span className="title">시스템 상태 (자원 현황)</span>
                    </div>
                    <div className="systemTable">
                        <div className="systemRow">
                            <span className="systemLabel">CPU 사용률</span>
                            <span className="systemValue">82.6 %</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">메모리 사용률</span>
                            <span className="systemValue">83.9 %</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">디스크 여유 공간</span>
                            <span className="systemValue">55.9 GB</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">네트워크 트래픽</span>
                            <span className="systemValue">81 Mbps</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">API 응답 속도</span>
                            <span className="systemValue">45 ms</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">활성 미션 수</span>
                            <span className="systemValue">3</span>
                        </div>
                    </div>
                </div>
                )}

                {/* 요약지표 상세 탭 */}
                {activeTab === 'summary' && (
                <div className="alertContent summaryPanel">
                    <div className="summaryHeader">
                        <span className="title">상태 분포 (실시간)</span>
                        <div className="legendWrap">
                            <span className="legend"><span className="dot purple"></span>실행중 4</span>
                            <span className="legend"><span className="dot orange"></span>대기 3</span>
                            <span className="legend"><span className="dot green"></span>완료 6</span>
                            <span className="legend"><span className="dot red"></span>취소 2</span>
                        </div>
                    </div>
                    <div className="summaryContent">
                        <div className="summarySection">
                            <div className="sectionHeader purple">실행중인 미션</div>
                            <div className="missionList">
                                <div className="missionItem">
                                    <div className="missionInfo">
                                        <span className="missionName">BAY2 라인 피더 공급</span>
                                        <span className="missionId">M-20251201-004 / 장치 AMR-BAY2-0001</span>
                                    </div>
                                    <span className="missionStatus warning">Warning</span>
                                </div>
                                <div className="missionItem">
                                    <div className="missionInfo">
                                        <span className="missionName">창고 택 보충 작업</span>
                                        <span className="missionId">M-20251203-007 / 장치 STK-R10-0020</span>
                                    </div>
                                    <span className="missionStatus running">실행중</span>
                                </div>
                                <div className="missionItem">
                                    <div className="missionInfo">
                                        <span className="missionName">BAY2 라인 야간 공급</span>
                                        <span className="missionId">M-20251206-011 / 장치 AMR-BAY2-0003</span>
                                    </div>
                                    <span className="missionStatus normal">Normal</span>
                                </div>
                                <div className="missionItem">
                                    <div className="missionInfo">
                                        <span className="missionName">BAY2 긴급 미션</span>
                                        <span className="missionId">M-20251208-014 / 장치 AMR-BAY2-0005</span>
                                    </div>
                                    <span className="missionStatus running">실행중</span>
                                </div>
                            </div>
                        </div>
                        <div className="summarySection">
                            <div className="sectionHeader gray">실행중인 태스크</div>
                            <div className="missionList">
                                <div className="missionItem">
                                    <div className="missionInfo">
                                        <span className="missionName">디팰레타이징</span>
                                        <span className="missionId">입고 공정 / M-20251201-004</span>
                                    </div>
                                    <span className="missionStatus warning">Warning</span>
                                </div>
                                <div className="missionItem">
                                    <div className="missionInfo">
                                        <span className="missionName">진행 중</span>
                                        <span className="missionId">미분류 / M-20251203-007</span>
                                    </div>
                                    <span className="missionStatus normal">Normal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
       </main>
    );
};

export default Page;