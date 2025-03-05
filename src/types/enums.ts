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
  
  export type ChatFlowNodesData = {
    id?: string;
    type?: Chat;
    header?: string;
    title?: string;
    message?: string;
    name?: string;
    value?: never;
    valueType?: string;
    targetNode?: string;
    url?: string;
    supportedFileTypes?: string[];
    maxSize?: string;
    maxUploads?: number;
    allowFile?: boolean;
  };
  