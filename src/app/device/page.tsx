'use client';
import React from 'react';
import './device.scss';
import DeviceList from '../ui/device/device_list';
import DeviceDetail from '../ui/device/device_detail';
import DeviceGroup from '../ui/device/device_group';
import { Device } from '../types/type';

const deviceData: Device[] = [
    { id: 'AMR-A01-0001', modelName: 'AMR (Zone A-1)', status: 'Move', statusClass: 'move', currentLocation: 'AREA_A_node_105', groupId: 'A001', group: 'A동 1층 그룹' },
    { id: 'AMR-A01-0002', modelName: 'AMR (Zone A-2)', status: 'Charging', statusClass: 'charging', currentLocation: 'Charging_Station_A1', groupId: 'A001', group: 'A동 1층 그룹' },
    { id: 'ELV-E-0003', modelName: 'Elevator (East)', status: 'Stop', statusClass: 'stop', currentLocation: 'Lobby_Waiting_Node', groupId: 'A001', group: 'A동 1층 그룹' },
    { id: 'FLT-W03-0005', modelName: 'Fork Lift (W3)', status: 'Error', statusClass: 'error', currentLocation: 'AREA_B_node_30', groupId: 'A002', group: 'A동 2층 그룹' },
    { id: 'AMR-A02-0003', modelName: 'AMR (Zone A-3)', status: 'Stop', statusClass: 'stop', currentLocation: 'AREA_B_node_45', groupId: 'A002', group: 'A동 2층 그룹' },
    { id: 'CNV-L2-1002', modelName: 'Conveyor (Line 2)', status: 'Move', statusClass: 'move', currentLocation: 'Conveyor_Start_B', groupId: 'B001', group: 'B동 창고 그룹' },
    { id: 'STK-R10-0020', modelName: 'Stocker (Rack 10)', status: 'Ready', statusClass: 'ready', currentLocation: 'Rack_10_Position', groupId: 'B001', group: 'B동 창고 그룹' },
    { id: 'STK-R10-0021', modelName: 'Stocker (Rack 11)', status: 'Alarm', statusClass: 'alarm', currentLocation: 'Rack_11_Position', groupId: 'B001', group: 'B동 창고 그룹' },
    { id: 'FLT-C01-0006', modelName: 'Fork Lift (C1)', status: 'Stop', statusClass: 'stop', currentLocation: 'AREA_C_node_401', groupId: 'C001', group: 'C동 물류 센터' },
    { id: 'CNV-M1-1003', modelName: 'Conveyor (Main)', status: 'Error', statusClass: 'error', currentLocation: 'Conveyor_Main_C', groupId: 'C001', group: 'C동 물류 센터' },
    { id: 'ARM-C-0105', modelName: 'Arm (Cell C)', status: 'Move', statusClass: 'move', currentLocation: 'AREA_C_node_410', groupId: 'C001', group: 'C동 물류 센터' },
    { id: 'ARM-C-0106', modelName: 'Arm (Cell D)', status: 'Ready', statusClass: 'ready', currentLocation: 'AREA_C_node_411', groupId: 'C001', group: 'C동 물류 센터' },
    { id: 'ATD-I-0015', modelName: 'Automatic Door (Inlet)', status: 'Ready', statusClass: 'ready', currentLocation: 'Main_Gate_Node', groupId: 'M001', group: '본관 자동화 구역' },
    { id: 'AMR-X-0010', modelName: 'AMR (Test Unit)', status: 'Stop', statusClass: 'stop', currentLocation: 'Waiting_Node_1', groupId: 'NA00', group: '미할당' },
    { id: 'ARM-T-0001', modelName: 'Arm (New Install)', status: 'Alarm', statusClass: 'alarm', currentLocation: 'Warehouse_Corner', groupId: 'NA00', group: '미할당' },
    { id: 'CNV-Z-0001', modelName: 'Conveyor (Spare)', status: 'Ready', statusClass: 'ready', currentLocation: 'Waiting_Node_2', groupId: 'NA00', group: '미할당' },
];

const page = () => {
    const [menuValue, setMenuValue] = React.useState(0)
    return (
        <div className="device">
            <div className="menu-nav">
                <button className={menuValue === 0 ? "active" : ""} onClick={()=>setMenuValue(0)}>디바이스 목록</button>
                <button className={menuValue === 1 ? "active" : ""} onClick={()=>setMenuValue(1)}>디바이스 상세</button>
                <button className={menuValue === 2 ? "active" : ""} onClick={()=>setMenuValue(2)}>디바이스 그룹</button>
            </div>
            <div className="container">
              {
                menuValue === 0  && (
                    <DeviceList deviceData={deviceData} />
                )
              }
              {
                menuValue === 1  && (
                    <DeviceDetail deviceData={deviceData} />
                )
              }
              {
                menuValue === 2  && (
                    <DeviceGroup deviceData={deviceData} />
                )
              }
            </div>
        </div>
    );
};

export default page;