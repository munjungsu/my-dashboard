'use client';
import { useState } from 'react';
import './period_stats.scss';

interface PeriodStatsData {
    completedMissions: number;
    canceledMissions: number;
    alertCount: number;
}

interface PeriodStatsProps {
    data?: PeriodStatsData;
}

const PeriodStats = ({ data }: PeriodStatsProps) => {
    const [activePeriod, setActivePeriod] = useState('day');

    const statsData = data || {
        completedMissions: 6,
        canceledMissions: 0,
        alertCount: 7,
    };

    return (
        <div className="periodStats">
            <div className="titleWrap">
                <span className="title">기간별 요약지표</span>
                <div className="periodActions">
                    <button 
                        className={`periodBtn ${activePeriod === 'day' ? 'active' : ''}`}
                        onClick={() => setActivePeriod('day')}
                    >
                        일
                    </button>
                    <button 
                        className={`periodBtn ${activePeriod === 'week' ? 'active' : ''}`}
                        onClick={() => setActivePeriod('week')}
                    >
                        주
                    </button>
                    <button 
                        className={`periodBtn ${activePeriod === 'month' ? 'active' : ''}`}
                        onClick={() => setActivePeriod('month')}
                    >
                        월
                    </button>
                    <button 
                        className={`periodBtn ${activePeriod === 'custom' ? 'active' : ''}`}
                        onClick={() => setActivePeriod('custom')}
                    >
                        기간선택
                    </button>
                </div>
            </div>
            <div className="statsWrap">
                <div className="statCard">
                    <span className="statLabel">완료 미션 수</span>
                    <span className="statValue">{statsData.completedMissions}</span>
                </div>
                <div className="statCard">
                    <span className="statLabel">취소 미션 수</span>
                    <span className="statValue">{statsData.canceledMissions}</span>
                </div>
                <div className="statCard">
                    <span className="statLabel">알림 건수</span>
                    <span className="statValue">{statsData.alertCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PeriodStats;
