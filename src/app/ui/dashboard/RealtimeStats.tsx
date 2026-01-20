'use client';
import './realtime_stats.scss';

interface RealtimeStatsData {
    totalMissions: number;
    runningMissions: number;
    pendingMissions: number;
    onlineDevices: string;
    offlineDevices: number;
    activeDevices: number;
    alerts: number;
}

interface RealtimeStatsProps {
    data?: RealtimeStatsData;
}

const RealtimeStats = ({ data }: RealtimeStatsProps) => {
    const statsData = data || {
        totalMissions: 15,
        runningMissions: 4,
        pendingMissions: 3,
        onlineDevices: '19/21',
        offlineDevices: 2,
        activeDevices: 5,
        alerts: 7,
    };

    return (
        <div className="realtimeStats">
            <span className="title">실시간 요약지표</span>
            <div className="statsGrid">
                <div className="statCard">
                    <span className="statLabel">전체 미션</span>
                    <span className="statValue">{statsData.totalMissions}</span>
                </div>
                <div className="statCard">
                    <span className="statLabel">진행중 미션</span>
                    <span className="statValue">{statsData.runningMissions}</span>
                </div>
                <div className="statCard">
                    <span className="statLabel">대기중 미션</span>
                    <span className="statValue">{statsData.pendingMissions}</span>
                </div>
                <div className="statCard green">
                    <span className="statLabel">온라인 장치</span>
                    <span className="statValue">{statsData.onlineDevices}</span>
                </div>
                <div className="statCard">
                    <span className="statLabel">오프라인 장치</span>
                    <span className="statValue">{statsData.offlineDevices}</span>
                </div>
                <div className="statCard green">
                    <span className="statLabel">운행중 장치</span>
                    <span className="statValue">{statsData.activeDevices}</span>
                </div>
                <div className="statCard yellow">
                    <span className="statLabel">알림</span>
                    <span className="statValue">{statsData.alerts}</span>
                </div>
            </div>
        </div>
    );
};

export default RealtimeStats;
