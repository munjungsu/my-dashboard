'use client';
import { useState } from 'react';
import './recent_events.scss';

interface EventItem {
    time: string;
    status: 'error' | 'alarm' | 'info';
    description: string;
}

interface SystemStatus {
    cpuUsage: string;
    memoryUsage: string;
    diskSpace: string;
    networkTraffic: string;
    apiResponseTime: string;
    activeMissions: number;
}

interface MissionItem {
    name: string;
    id: string;
    status: 'warning' | 'running' | 'normal';
    statusLabel: string;
}

interface SummaryData {
    running: number;
    pending: number;
    completed: number;
    canceled: number;
    runningMissions: MissionItem[];
    runningTasks: MissionItem[];
}

interface RecentEventsProps {
    events?: EventItem[];
    systemStatus?: SystemStatus;
    summaryData?: SummaryData;
}

const RecentEvents = ({ events, systemStatus, summaryData }: RecentEventsProps) => {
    const [activeTab, setActiveTab] = useState('event');

    const defaultEvents: EventItem[] = [
        { time: '[02:05:10]', status: 'error', description: 'AMR-A01-0002 : 모터 드라이버 통신 오류. 운행 중단.' },
        { time: '[02:08:45]', status: 'alarm', description: 'STK-R10-0021 : 비정상적인 온도 상승 감지 (35°C)' },
        { time: '[02:10:01]', status: 'info', description: 'HBR-M01-0001 : 목적지 AREA_A_node_10 도착 완료.' },
        { time: '[02:11:30]', status: 'info', description: '시스템 재부팅 예정 알림. (10분 후)' },
        { time: '[02:12:05]', status: 'alarm', description: 'AMR-X-0010 : 배터리 잔량 임계치 이하 (15%)' },
        { time: '[02:13:00]', status: 'error', description: 'CNV-M1-1003 : 센서 데이터 불일치. 연결 끊김.' },
        { time: '[02:13:30]', status: 'info', description: 'FLT-C01-0006 : 작업 재개.' },
    ];

    const defaultSystemStatus: SystemStatus = {
        cpuUsage: '82.6 %',
        memoryUsage: '83.9 %',
        diskSpace: '55.9 GB',
        networkTraffic: '81 Mbps',
        apiResponseTime: '45 ms',
        activeMissions: 3,
    };

    const defaultSummaryData: SummaryData = {
        running: 4,
        pending: 3,
        completed: 6,
        canceled: 2,
        runningMissions: [
            { name: 'BAY2 라인 피더 공급', id: 'M-20251201-004 / 장치 AMR-BAY2-0001', status: 'warning', statusLabel: 'Warning' },
            { name: '창고 택 보충 작업', id: 'M-20251203-007 / 장치 STK-R10-0020', status: 'running', statusLabel: '실행중' },
            { name: 'BAY2 라인 야간 공급', id: 'M-20251206-011 / 장치 AMR-BAY2-0003', status: 'normal', statusLabel: 'Normal' },
            { name: 'BAY2 긴급 미션', id: 'M-20251208-014 / 장치 AMR-BAY2-0005', status: 'running', statusLabel: '실행중' },
        ],
        runningTasks: [
            { name: '디팰레타이징', id: '입고 공정 / M-20251201-004', status: 'warning', statusLabel: 'Warning' },
            { name: '진행 중', id: '미분류 / M-20251203-007', status: 'normal', statusLabel: 'Normal' },
        ],
    };

    const eventData = events || defaultEvents;
    const systemData = systemStatus || defaultSystemStatus;
    const summary = summaryData || defaultSummaryData;

    return (
        <div className="recentEvents">
            <div className="tabWrap">
                <button 
                    className={`tabBtn ${activeTab === 'event' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('event')}
                >
                    최근 이벤트
                </button>
                <button 
                    className={`tabBtn ${activeTab === 'system' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('system')}
                >
                    시스템 상태 패널
                </button>
                <button 
                    className={`tabBtn ${activeTab === 'summary' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('summary')}
                >
                    요약지표 상세
                </button>
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
                            {eventData.map((event, index) => (
                                <div className="tableRow" key={index}>
                                    <span className="col time">{event.time}</span>
                                    <span className={`col status ${event.status}`}>
                                        {event.status.toUpperCase()}
                                    </span>
                                    <span className="col desc">{event.description}</span>
                                </div>
                            ))}
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
                            <span className="systemValue">{systemData.cpuUsage}</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">메모리 사용률</span>
                            <span className="systemValue">{systemData.memoryUsage}</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">디스크 여유 공간</span>
                            <span className="systemValue">{systemData.diskSpace}</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">네트워크 트래픽</span>
                            <span className="systemValue">{systemData.networkTraffic}</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">API 응답 속도</span>
                            <span className="systemValue">{systemData.apiResponseTime}</span>
                        </div>
                        <div className="systemRow">
                            <span className="systemLabel">활성 미션 수</span>
                            <span className="systemValue">{systemData.activeMissions}</span>
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
                            <span className="legend"><span className="dot purple"></span>실행중 {summary.running}</span>
                            <span className="legend"><span className="dot orange"></span>대기 {summary.pending}</span>
                            <span className="legend"><span className="dot green"></span>완료 {summary.completed}</span>
                            <span className="legend"><span className="dot red"></span>취소 {summary.canceled}</span>
                        </div>
                    </div>
                    <div className="summaryContent">
                        <div className="summarySection">
                            <div className="sectionHeader purple">실행중인 미션</div>
                            <div className="missionList">
                                {summary.runningMissions.map((mission, index) => (
                                    <div className="missionItem" key={index}>
                                        <div className="missionInfo">
                                            <span className="missionName">{mission.name}</span>
                                            <span className="missionId">{mission.id}</span>
                                        </div>
                                        <span className={`missionStatus ${mission.status}`}>{mission.statusLabel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="summarySection">
                            <div className="sectionHeader gray">실행중인 태스크</div>
                            <div className="missionList">
                                {summary.runningTasks.map((task, index) => (
                                    <div className="missionItem" key={index}>
                                        <div className="missionInfo">
                                            <span className="missionName">{task.name}</span>
                                            <span className="missionId">{task.id}</span>
                                        </div>
                                        <span className={`missionStatus ${task.status}`}>{task.statusLabel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentEvents;
