import { Handle, Position, useNodeConnections, useNodeId } from '@xyflow/react';
import React, { memo } from 'react';

import type { CustomNodeProps } from '@/types/enums';
import { Chat } from '@/types/enums';

import CustomHandle from './CustomHandle';
import Image from 'next/image';
import TalkBubble from '../../../public/chatBot/talk-bubble-icon.svg';
import ConclusionIcon from '../../../public/chatBot/conclusion-icon.svg';
import FeedbackIcon from '../../../public/chatBot/feedback-icon.png';
import FolderIcon from '../../../public/chatBot/open-file-folder-icon.svg';
import QueryIcon from '../../../public/chatBot/question-thinking-icon.svg';
import ApiIcon from '../../../public/chatBot/api-icon.svg';
import TriggerIcon from '../../../public/chatBot/flag-red-icon.svg';

function CustomNode({
  type,
  data,
  selected,
  setNodes,
  reactFlowNodes,
  edges,
  setEdges,
}: CustomNodeProps) {
  const title = data?.[Chat.nodeTitle];
  const message = data?.[Chat.nodeMessage];
  const nodeId = useNodeId();
  const node = reactFlowNodes?.find((ele) => ele?.id === nodeId);
  const deleteNode = (id: string, nodeType: string) => {
    // Check if the node is of type "option"
    if (
      nodeType === Chat?.buttonsInput ||
      nodeType === Chat?.feedback ||
      nodeType === Chat?.collectInput ||
      nodeType === Chat?.conditionNode
    ) {
      // Find connected reactFlowNodes
      const connectedNodeIds = edges
        .filter((edge) => edge.source === id)
        .map((edge) => (edge.source === id ? edge.target : edge.source));

      // Filter out reactFlowNodes that are connected to the current node
      const updatedNodes = reactFlowNodes.filter(
        (nd) => nd.id !== id && !connectedNodeIds.includes(nd.id)
      );

      // Remove all edges related to this node and connected reactFlowNodes
      const updatedEdges = edges.filter(
        (edge) =>
          edge.source !== id &&
          edge.target !== id &&
          !connectedNodeIds.includes(edge.source) &&
          !connectedNodeIds.includes(edge.target)
      );

      setNodes(updatedNodes);
      setEdges(updatedEdges);
    } else {
      // For non-option reactFlowNodes, just delete the node and its related edges
      const updatedNodes = reactFlowNodes.filter((nd) => nd.id !== nodeId);
      const updatedEdges = edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      setNodes(updatedNodes);
      setEdges(updatedEdges);
    }
  };

  const connections = useNodeConnections();
  return (
    <>
      {type === Chat.chatTrigger && (
        <div
          className={`relative h-20 w-60 rounded-md border-l-2 border-red-100  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}
        >
          <header className="flex gap-2 justify-center items-center">
            <Image src={TriggerIcon} alt="img" width={20} height={20} />
            <h1 className="truncate text-center text-sm font-semibold">
              {title}
            </h1>
          </header>

          <div className=" truncate rounded-md p-2 text-center text-xs outline-none">
            {message}
          </div>

          <CustomHandle
            type="source"
            position={Position.Bottom}
            id="bottom"
            connectionCount={1}
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.sendMessage && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}
        >
          <div className="flex justify-between">
          <header className="flex gap-2 justify-center items-center">
            <Image src={TalkBubble} alt="img" width={20} height={20} />
            <h1 className="truncate text-center text-sm font-semibold">
              {title}
            </h1>
          </header>
            <div
              className={`absolute right-1 top-1 size-6 cursor-pointer bg-center bg-no-repeat ${
                node?.lastNode && 'hidden'
              }`}
              style={{ backgroundImage: `url('/delete.svg')` }}
              onClick={() => deleteNode(node?.id as string, type)}
            ></div>
          </div>
          <div className="mt-1 h-14 truncate rounded-md p-2 text-xs">
            {message}
          </div>
          <CustomHandle
            type="target"
            position={Position.Top}
            id="top"
            className="custom-handle"
          />
          <CustomHandle
            type="source"
            position={Position.Bottom}
            id="bottom"
            connectionCount={1}
            className={`custom-handle ${node?.lastNode && 'hidden'}`}
          />
        </div>
      )}
      {type === Chat.collectInput && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}
        >
          <div className="flex justify-between">
          <header className="flex gap-2 justify-center items-center">
            <Image src={QueryIcon} alt="img" width={20} height={20} />
            <h1 className="truncate text-center text-sm font-semibold">
              {title}
            </h1>
          </header>
            <div
              className="absolute right-1 top-1 size-6 cursor-pointer bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/delete.svg')` }}
              onClick={() => deleteNode(node.id, type)}
            ></div>
          </div>

          <div className="mt-1 h-14 truncate rounded-md p-2 text-xs">
            {message}
          </div>
          <CustomHandle
            type="target"
            position={Position.Top}
            id="top"
            className="custom-handle"
          />

          <CustomHandle
            type="source"
            position={Position.Bottom}
            id="bottom"
            connectionCount={1}
            className={`custom-handle`}
          />
        </div>
      )}
      {type === Chat.collectFile && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}
        >
          <div className="flex justify-between">
          <header className="flex gap-2 justify-center items-center">
            <Image src={FolderIcon} alt="img" width={20} height={20} />
            <h1 className="truncate text-center text-sm font-semibold">
              {title}
            </h1>
          </header>
            <div
              className="absolute right-1 top-1 size-6 cursor-pointer bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/delete.svg')` }}
              onClick={() => deleteNode(node?.id, type)}
            ></div>
          </div>

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
          }`}
        >
          <div className="flex justify-between">
          <header className="flex gap-2 justify-center items-center">
            <Image src={ConclusionIcon} alt="img" width={20} height={20} />
            <h1 className="truncate text-center text-sm font-semibold">
              {title}
            </h1>
          </header>
            <div
              className="absolute right-1 top-1 size-6 cursor-pointer bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/delete.svg')` }}
              onClick={() => deleteNode(node?.id, type)}
            ></div>
          </div>

          <div className="mt-1 h-14 truncate rounded-md p-2 text-xs">
            {message}
          </div>
          <CustomHandle
            type="target"
            position={Position.Top}
            id="top"
            className="custom-handle"
          />
          <CustomHandle
            type="source"
            position={Position.Bottom}
            id="bottom"
            isConnectable={false}
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.conditionDecoder && (
        <div
          className={`relative flex  h-fit w-60 max-w-fit items-center justify-between rounded-md  bg-blue-400 p-4  text-white shadow-md `}
        >
          <div className="text-sm font-semibold">{title}</div>
          <CustomHandle
            type="target"
            position={Position.Top}
            id="top"
            connectionCount={1}
            className="custom-handle"
          />
          <CustomHandle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="custom-handle"
          />
        </div>
      )}
      {type === Chat.conditionNode && (
        <div
          className={`relative flex h-16 w-auto min-w-32 items-center justify-center  rounded-md bg-yellow-50 p-2   shadow-md ${
            selected
              ? 'border  border-yellow-700'
              : 'border-l-2 border-yellow-600'
          }`}
        >
          <div
            className="absolute right-1 top-1 size-5 cursor-pointer bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/delete.svg')` }}
            onClick={() => deleteNode(node?.id, type)}
          ></div>
          <header className="truncate text-center text-sm font-semibold">
            {`${type}S`}
          </header>

          <CustomHandle
            type="target"
            position={Position.Top}
            className="custom-handle"
            id="top"
          />

          <CustomHandle
            type="source"
            position={Position.Bottom}
            id="bottom"
            isConnectable={false}
            className="custom-handle"
          />
        </div>
      )}

      {type === Chat.feedback && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}
        >
          <div className="flex justify-between">
          <header className="flex gap-2 justify-center items-center">
            <Image src={FeedbackIcon} alt="img" width={20} height={20} />
            <h1 className="truncate text-center text-sm font-semibold">
              {title}
            </h1>
          </header>
            <div
              className="absolute right-1 top-1 size-6 cursor-pointer bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/delete.svg')` }}
              onClick={() => deleteNode(node?.id, type)}
            ></div>
          </div>

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
          className={`relative  h-10  w-24 rounded-md bg-gray-200 p-2  shadow-md`}
        >
          <header className="truncate text-center text-sm font-semibold">
            {title}
          </header>

          <CustomHandle
            type="target"
            position={Position.Top}
            className="custom-handle"
            connectionCount={1}
            id="top"
          />

          <CustomHandle
            type="source"
            position={Position.Bottom}
            id="bottom"
            connectionCount={1}
            className="custom-handle"
          />
        </div>
      )}

      {type === Chat.api && (
        <div
          className={`relative h-28 w-60 rounded-md border-l-2 border-blue-700  bg-white p-4 shadow-md ${
            selected && 'border border-cyan-600'
          }`}
        >
          <div className="flex justify-between">
          <header className="flex gap-2 justify-center items-center">
            <Image src={ApiIcon} alt="img" width={20} height={20} />
            <h1 className="truncate text-center text-sm font-semibold">
              {title}
            </h1>
          </header>
            <div
              className="absolute right-1 top-1 size-6 cursor-pointer bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/delete.svg')` }}
              onClick={() => deleteNode(node?.id, type)}
            ></div>
          </div>
          <div className=" truncate rounded-md p-2 text-xs">{message}</div>
          <div className=" truncate rounded-md  text-xs">
            <span className="p-2 text-xs font-semibold text-blue-700">
              API Name:{' '}
            </span>{' '}
            {node?.data?.[Chat.name] || node?.data?.[Chat.apiType]}
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
