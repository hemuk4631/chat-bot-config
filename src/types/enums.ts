import type { Edge as FlowEdgeBase, Node as FlowNode } from '@xyflow/react';

export type FlowEdge = FlowEdgeBase & {
  locked?: boolean;
};
export enum UserRole {
  admin = 'ADMIN',
  superAdmin = 'SUPER_ADMIN',
  callingAgent = 'CALLING_AGENT',
  hubManager = 'HUB_MANAGER',
  cwhManager = 'CWH_MANAGER',
  ccSupervisor = 'CC_SUPERVISOR',
  onBoardingManager = 'ONBOARDING_MANAGER',
  onBoardingAgent = 'ONBOARDING_AGENT',
  fsa = 'FSA',
  superSuperAdmin = 'SUPER_SUPER_ADMIN',
  retailer = 'RETAILER',
}
export enum AppType {
  FSA = 'FSA',
  O2R = 'O2R',
}
export enum Chat {
  bot = 'bot',
  user = 'user',
  chatTrigger = 'trigger',
  sendMessage = 'text',
  collectInput = 'userQuery',
  buttonsInput = 'option',
  feedback = 'feedback',
  collectFile = 'collectFile',
  button = 'decisionButton',
  api = 'api',
  nodeTitle = 'title',
  nodeMessage = 'message',
  options = 'options',
  name = 'name',
  value = 'value',
  valueType = 'valueType',
  targetNode = 'targetNode',
  url = 'url',
  supportedFileTypes = 'supportedFileTypes',
  maxSize = 'maxSize',
  maxUploads = 'maxUploads',
}
export enum Ticket {
  Assigned = 'Assigned',
  ReAssigned = 'ReAssigned',
  Closed = 'Closed',
}
// Your custom data type
export type CustomNodeData = {
  type: string;
  title?: string;
  message?: string;
  [key: string]: any;
};

// Combined node type for use in React Flow
export type CustomFlowNode = FlowNode<CustomNodeData> & {
  lastNode?: boolean;
};

export type CustomNodeProps = {
  type: string;
  data: CustomNodeData;
  selected: boolean;
  setNodes: React.Dispatch<React.SetStateAction<CustomFlowNode[]>>;
  reactFlowNodes: CustomFlowNode[];
  edges: FlowEdgeBase[];
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
  lastNode?: boolean;
  position: {
    x: number;
    y: number;
  };
};

export type Connection = {
  source: string;
  target: string;
  sourceHandle: string | null;
  targetHandle: string | null;
};
