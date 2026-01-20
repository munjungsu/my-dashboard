'use client';
import './dashboard.scss';
import { CardWrapper } from '../../ui/dashboard/cards';
import PeriodStats from '../../ui/dashboard/PeriodStats';
import RealtimeStats from '../../ui/dashboard/RealtimeStats';
import RecentEvents from '../../ui/dashboard/RecentEvents';
import MapCanvas from '../../ui/dashboard/MapCanvas';

const Page = () => {
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
                    <MapCanvas mapUrl="/data/Map1.pgm" />
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
            <PeriodStats />
            <RealtimeStats />
            <RecentEvents />
        </div>
       </main>
    );
};

export default Page;