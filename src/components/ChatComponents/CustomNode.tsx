import type { Node, NodeProps } from '@xyflow/react';
// import { useReactFlow } from '@xyflow/react';
import React, { memo } from 'react';

import {
 
  Handle,
  Position,
  useNodeConnections,
 
  useNodes,

  useNodeId,
} from '@xyflow/react';

// const handleStyle = { left: 10 };
import type { ChatFlowNodesData } from '@/types/enums';
import { Chat } from '@/types/enums';

type CustomNode = Node<ChatFlowNodesData, 'string'>;

function CustomNode({ type, data, selected }: NodeProps<CustomNode>) {
  const title = data?.[Chat.nodeTitle];
  const message = data?.[Chat.nodeMessage];
  const nodes = useNodes();
  const nodeId = useNodeId(); // Get the current node ID
  const node = nodes?.find((ele) => ele?.id === nodeId);
 
  const connections = useNodeConnections();
  return (
    <>
      {type === Chat.chatTrigger && (
        <div
          className={`relative h-20 w-60 rounded-md border-l-2 border-red-500  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}>
          <header className="truncate text-sm text-center font-semibold">{title}</header>

          <div className=" truncate rounded-md p-2 text-xs text-center outline-none">
            {message}
          </div>

          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.sendMessage && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}>
          <header className="truncate text-sm font-semibold">{title}</header>
          <div className="mt-1 h-14 truncate rounded-md p-2 text-xs">
            {message}
          </div>
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            className="custom-handle"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.collectInput && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}>
          <header className="truncate text-sm font-semibold">{title}</header>

          <div className="mt-1 h-14 truncate rounded-md p-2 text-xs">
            {message}
          </div>
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.collectFile && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}>
          <header className="truncate text-sm font-semibold">{title}</header>

          <div className="mt-1 h-14 truncate rounded-md p-2 text-xs">
            {message}
          </div>
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.buttonsInput && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}>
          <header className="truncate text-sm font-semibold">{title}</header>

          <div className="mt-1 h-14 truncate rounded-md p-2 text-xs">
            {message}
          </div>
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            className="custom-handle"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.feedback && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}>
          <header className="truncate text-sm font-semibold">{title}</header>

          <div className="mt-1 h-14 truncate rounded-md p-2 text-xs">
            {message}
          </div>
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            className="custom-handle"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.button && (
        <div
          className={`relative  w-24  h-10 rounded-md bg-gray-500 p-2  text-white shadow-md`}>
          <header className="truncate text-center text-sm font-semibold">
            {title}
          </header>

          <Handle
            type="target"
            position={Position.Top}
            className="custom-handle"
            id="top"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.api && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}>
          <header className="truncate  text-sm font-semibold">{title}</header>
          <div className=" truncate rounded-md p-2 text-xs">{message}</div>
          <div className=" truncate rounded-md  text-xs">
            <span className="text-xs p-2 font-semibold text-blue-700">
              API Name:{' '}
            </span>{' '}
            {node?.data?.[Chat.name]}
          </div>
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            className="custom-handle"
            isConnectable={connections?.length < 2}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="custom-handle"
          />
        </div>
      )}
    </>
  );
}

export default memo(CustomNode);
