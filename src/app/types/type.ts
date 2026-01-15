// Mission 관련 타입
export interface Mission {
    id: string;
    name: string;
    status: string;
    statusClass: string;
    progress: string;
    progressDetail: string;
    progressClass: string;
    device: string;
    schedule: string;
    update: string;
}

export interface Task {
    id: number;
    name: string;
    description: string;
    status: string;
    statusClass: string;
    devices: { type: string; id: string }[];
}

export interface LogEntry {
    time: string;
    description: string;
}

// Device 관련 타입
export interface Device {
    id: string;
    modelName: string;
    status: string;
    statusClass: string;
    currentLocation: string;
    groupId: string;
    group: string;
}

export interface DeviceDetail {
    // 장치 위치 (실시간)
    currentLocation: string;
    currentDestination: string;
    destinationChange: string;
    
    // 실시간 상세 정보
    battery: string;
    loadedWeight: string;
    temperature: string;
    commStatus: string;
    errorCode: string;
    
    // 실시간 주행 정보
    currentTask: string;
    currentAction: string;
    drivingStatus: string;
    finalDestination: string;
    remainingTime: string;
    torqueFree: string;
    ems: string;
    robotPosition: string;
    targetSpeed: string;
    currentSpeed: string;
    
    // 기준 정보 및 관리
    deviceId: string;
    deviceModelName: string;
    deviceType: string;
    robotType: string;
    manufactureDate: string;
    installLocation: string;
    task: string;
    lastInspectionDate: string;
    swVersion: string;
    
    // 상세 스펙
    shape: string;
    diameter: string;
    width: string;
    length: string;
    frontLength: string;
    sideLength: string;
    vertices: string;
    height: string;
    drivingType: string;
    
    // 속성
    consoleLogLevel: string;
    fileLogLevel: string;
    moduleImageDisplay: string;
    maxLoad: string;
    maxDrivingSpeed: string;
    emergencyStopDistance: string;
    lidarRange: string;
    cameraResolution: string;
    cameraFov: string;
}

// Props 타입
export interface DeviceListProps {
    deviceData: Device[];
}

export interface DeviceDetailProps {
    deviceData: Device[];
}
