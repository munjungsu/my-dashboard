import './cards.scss';

export const CardWrapper = () => {
    return (
        <div className="card-wrapper">
            <Card 
                title="입고 공정" 
                subTitle="원자재 입고 및 검수 관련 미션 그룹" 
                status="Warning" 
                missionProgress={{ current: 0, total: 1 }}
                taskProgress={{ current: 1, total: 4 }}
                tags={["원자재 입고", "디팰레타이징", "IQC & 원자재 저장"]}
            />
            <Card 
                title="출고 공정" 
                subTitle="-" 
                status="Normal" 
                missionProgress={{ current: 0, total: 0 }}
                taskProgress={{ current: 0, total: 0 }}
                tags={[]}
            />
            <Card 
                title="조립 공정" 
                subTitle="-" 
                status="Normal" 
                missionProgress={{ current: 0, total: 0 }}
                taskProgress={{ current: 0, total: 0 }}
                tags={[]}
            />
             <Card 
                title="미분류" 
                subTitle="-" 
                status="Normal" 
                missionProgress={{ current: 0, total: 0 }}
                taskProgress={{ current: 0, total: 0 }}
                tags={[]}
            />
        </div>
    )
}

export const Card = ({
    title,
    subTitle,
    status,
    missionProgress,
    taskProgress,
    tags,
}: {
    title: string;
    subTitle: string;
    status: 'Warning' | 'Normal' | string;
    missionProgress: { current: number; total: number };
    taskProgress: { current: number; total: number };
    tags: string[];
}) => {
    const taskPercentage = taskProgress.total > 0 
        ? (taskProgress.current / taskProgress.total) * 100 
        : 0;

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title-area">
                    <h2 className="card-title">{title}</h2>
                    <span className="card-subTitle">{subTitle}</span>
                </div>
                <div className={`card-status ${status.toLowerCase()}`}>{status}</div>
            </div>
            <div className="card-body">
                <div className="progress-row">
                    <span className="progress-label">미션 진행률</span>
                    <span className="progress-value">{missionProgress.current}/{missionProgress.total} 완료</span>
                </div>
                 <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${taskPercentage}%` }}></div>
                </div>
                <div className="progress-row">
                    <span className="progress-label">태스크 진행률</span>
                    <span className="progress-value">{taskProgress.current}/{taskProgress.total} 완료</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${taskPercentage}%` }}></div>
                </div>
            </div>
            {tags.length > 0 && (
                <div className="card-footer">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Card;