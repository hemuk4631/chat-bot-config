import '@xyflow/react/dist/style.css';

import type { Edge, OnReconnect, ReactFlowInstance } from '@xyflow/react';
import {
  addEdge,
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  Panel,
  ReactFlow,
  reconnectEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import ApiNodeForm from '@/components/ChatComponents/ApiNodeForm';
import ButtonsInputForm from '@/components/ChatComponents/ButtonsInputForm';
import ChatFlowHeader from '@/components/ChatComponents/ChatFlowHeader';
import ChatTriggerForm from '@/components/ChatComponents/ChatTriggerForm';
import CollectFileForm from '@/components/ChatComponents/CollectFileForm';
import CollectInputForm from '@/components/ChatComponents/CollectInputForm';
import CustomNode from '@/components/ChatComponents/CustomNode';
import FeedbackNodeForm from '@/components/ChatComponents/feedbackNodeForm';
import SendMessageForm from '@/components/ChatComponents/SendMessageFrom';
import { SideModal } from '@/components/sidemodal';
import TestBot from '@/components/ChatComponents/TestBot';
import { Chat } from '@/types/enums';

const nodeComponents = [
  // {
  //   type: Chat?.chatTrigger,
  //   label: 'Trigger',
  // },
  {
    type: Chat.sendMessage,
    label: 'Send Message',
  },
  {
    type: Chat.collectInput,
    label: 'User Query',
  },
  {
    type: Chat.buttonsInput,
    label: 'Options Node',
  },
  {
    type: Chat.feedback,
    label: 'feedback',
  },
  {
    type: Chat.collectFile,
    label: 'Collect File',
  },
  {
    type: Chat.api,
    label: 'API Node',
  },
];
const initialNodes = [
  {
    id: '1',
    type: Chat.chatTrigger,
    position: { x: 600, y: 70 },
    data: {
      [Chat.nodeTitle]: 'Trigger',
    },
  },
];
function ChatbotFlow() {
  const router = useRouter();
  const { workflow } = router.query; // Get workflow from query params
  const [workFlowName, setWorkFlowName] = useState(workflow);
  const [test, setTest] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [selectedNode, setSelectedNode] = useState<Node | undefined>();

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const isValidConnection = (connection) => {
    const { source, target } = connection;
    if (source === target) return false;
    return true;
  };
  const nodeTypes = Chat
    ? {
        [Chat.chatTrigger]: CustomNode,
        [Chat.collectInput]: CustomNode,
        [Chat.sendMessage]: CustomNode,
        [Chat.buttonsInput]: CustomNode,
        [Chat.collectFile]: CustomNode,
        [Chat.button]: CustomNode,
        [Chat.api]: CustomNode,
        [Chat.feedback]: CustomNode,
      }
    : {};

  const transformNodes = (nodes, edges) => {
    const targetMap = Object.fromEntries(
      edges.map(({ source, target }) => [source, target])
    );

    return nodes?.map((node) => {
      const isOptionNode =
        node?.type === Chat.buttonsInput || node?.type === Chat.feedback;
      if (isOptionNode) {
        return {
          ...node,
          data: {
            ...node?.data,
            options: edges
              .filter((edge) => edge?.source === node?.id)
              .map((edge) => ({
                name:
                  nodes?.find((n) => n.id === edge?.target)?.data?.title || '',
                value: '',
                valueType: '',
                targetNode: edges?.find((ele) => ele?.source === edge?.target)
                  ?.target
                  ? edges?.find((ele) => ele?.source === edge?.target).target
                  : edge?.target,
              })),
          },
        };
      }
      return {
        ...node,
        data: {
          ...node?.data,
          targetNode: targetMap[node.id],
        },
      };
    });
  };

  useEffect(() => {
    const transformedNodes = transformNodes(nodes, edges);
    console.log(transformedNodes);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const dragOutsideRef = useRef<Chat | null>(null);
  const onDragStart = (e: React.DragEvent<HTMLButtonElement>, type: Chat) => {
    dragOutsideRef.current = type;
    e.dataTransfer.effectAllowed = 'move';
  };
  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const type = dragOutsideRef.current;
    if (!type) return;
    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });
    let node;
    let stickedNode;
    let stickedNode1;
    let stickedNode2;
    if (
      [
        Chat.chatTrigger,
        Chat.sendMessage,
        Chat.collectInput,
        Chat.api,
      ].includes(type)
    ) {
      node = {
        id: nanoid(),
        type,
        position,
        data: {
          [Chat.nodeTitle]:
            nodeComponents?.find((ele) => ele?.type === type)?.label || '',
          [Chat.nodeMessage]: '',
        },
      };
    }
    // file
    if ([Chat.collectFile].includes(type)) {
      node = {
        id: nanoid(),
        type,
        position,
        data: {
          [Chat.nodeTitle]:
            nodeComponents?.find((ele) => ele?.type === type)?.label || '',
          [Chat.nodeMessage]: '',
          [Chat.supportedFileTypes]: ['docx', 'csv'],
          [Chat.maxSize]: '5MB',
          [Chat.maxUploads]: 3,
        },
      };
    }

    // option
    if ([Chat.buttonsInput].includes(type)) {
      node = {
        id: nanoid(),
        type,
        position,
        data: {
          value: nodeComponents?.find((ele) => ele.type === type)?.label,
          [Chat.nodeMessage]: '',
          [Chat.nodeTitle]: nodeComponents?.find((ele) => ele.type === type)
            ?.label,
        },
      };
      stickedNode = {
        id: nanoid(),
        type: Chat?.button,
        position: { x: node.position.x + 50, y: node.position.y + 200 },
        data: {
          [Chat.nodeTitle]: 'Option',
          payloadInputShow: false,
          payloadValue: '',
        },
      };
    }

    if (node && stickedNode && [Chat?.buttonsInput].includes(type)) {
      setEdges((prev) =>
        prev.concat({
          id: nanoid(),
          source: node?.id,
          target: stickedNode?.id,
        })
      );
      setNodes((prev) => prev.concat(node).concat(stickedNode));
    }

    // feedback
    if ([Chat?.feedback].includes(type)) {
      node = {
        id: nanoid(),
        type,
        position,
        data: {
          value: nodeComponents?.find((ele) => ele.type === type)?.label,
          [Chat?.nodeMessage]: '',
          [Chat.nodeTitle]: nodeComponents?.find((ele) => ele.type === type)
            ?.label,
        },
      };
      stickedNode1 = {
        id: nanoid(),
        type: Chat?.button,
        position: { x: node.position.x - 50, y: node.position.y + 200 },
        data: {
          [Chat.nodeTitle]: 'Yes',
        },
      };
      stickedNode2 = {
        id: nanoid(),
        type: Chat?.button,
        position: { x: node.position.x + 200, y: node.position.y + 200 },
        data: {
          [Chat.nodeTitle]: 'No',
        },
      };
    }
    if (
      node &&
      stickedNode1 &&
      stickedNode2 &&
      [Chat?.feedback].includes(type)
    ) {
      setEdges((prev) =>
        prev
          .concat({
            id: nanoid(),
            source: node?.id,
            target: stickedNode1?.id,
          })
          .concat({
            id: nanoid(),
            source: node?.id,
            target: stickedNode2?.id,
          })
      );
      setNodes((prev) =>
        prev.concat(node).concat(stickedNode1).concat(stickedNode2)
      );
    }

    if (node && !stickedNode && !stickedNode1 && !stickedNode2) {
      setNodes((prev) => prev.concat(node));
    }
  };
  const onNodeClick = (e: React.MouseEvent<Element>, node: Node) => {
    setSelectedNode(node);
  };
  useEffect(() => {
    const updatedetNode = nodes?.find((nd) => nd?.id === selectedNode?.id);
    setSelectedNode(updatedetNode);
  }, [nodes]);
  const onPaneClick = () => {
    setSelectedNode(undefined);
    setTest(false);
  };
  const edgeReconnectSuccessful = useRef(false);
  const onReconnectStart = () => {
    edgeReconnectSuccessful.current = false;
  };
  const onReconnect: OnReconnect = (oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((prevEdges) => reconnectEdge(oldEdge, newConnection, prevEdges));
  };
  const onReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((prevEdges) =>
        prevEdges.filter((prevEdge) => prevEdge.id !== edge.id)
      );
    }
  };
  const [rfInstance, setRfinstance] = useState<ReactFlowInstance<
    Node,
    Edge
  > | null>(null);

  const onSave = () => {
    if (rfInstance) {
      const flowKey = workFlowName;
      const newFlow = rfInstance?.toObject();
      const savedFlow = JSON.parse(localStorage.getItem('savedFlow')) || {};
      console.log(savedFlow);
      savedFlow[flowKey] = newFlow;
      localStorage.setItem('savedFlow', JSON.stringify(savedFlow));
    }
  };
  const onTest = () => {
    setSelectedNode(undefined);
    setTest(true);
    // localStorage.removeItem('savedFlow');
  };
  const onDeploy = () => {
    postChatFlow();
  };
  // Function to load a workflow from localStorage
  const loadFlow = (name) => {
    const savedFlow = JSON.parse(localStorage.getItem('savedFlow')) || {};
    return savedFlow[name] || null;
  };

  useEffect(() => {
    if (workflow) {
      setWorkFlowName(workflow);
      const storedFlow = loadFlow(workflow);
      if (storedFlow) {
        setNodes(storedFlow.nodes || []);
        setEdges(storedFlow.edges || []);
      }
    } else if (workFlowName && !workflow) {
      const storedFlow = loadFlow(workFlowName);
      if (storedFlow) {
        setNodes(storedFlow.nodes || []);
        setEdges(storedFlow.edges || []);
      } else {
        setNodes([]);
        setEdges([]);
      }
    }
  }, [workflow]);

  // post api
  //   const postChatFlow = async () => {
  //     const transformedNodes = transformNodes(nodes, edges);
  //     try {
  //       const resData = await FetchApi(
  //         `https://api.o2ronlin.com/oms/chat/name=${workFlowName}`,
  //         'POST',
  //         {
  //           Authorization: `Bearer ${getCookie('accessToken')}`,
  //         },
  //         {
  //           nodes: transformedNodes
  //             ?.filter((ele) => ele?.type !== Chat?.button)
  //             ?.map((node) => {
  //               return {
  //                 id: node?.id,
  //                 type: node?.type,
  //                 position: {
  //                   x: node.position.x,
  //                   y: node.position.y,
  //                 },
  //                 data: node?.data,
  //               };
  //             }),
  //         }
  //       );

  //       const { payload } = resData;
  //       if (payload) {
  //       }
  //     } catch (error) {}
  //   };

  return (
    <>
      <div style={{ height: '100vh', width: '100vw' }}>
        <ReactFlow
          onInit={setRfinstance}
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={{ style: { strokeWidth: 3 } }} // Applied after connection
          connectionLineStyle={{ strokeWidth: 3 }} // Applied while dragging
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
          isValidConnection={isValidConnection}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onReconnectStart={onReconnectStart}
          onReconnect={onReconnect}
          onReconnectEnd={onReconnectEnd}>
          <ChatFlowHeader
            onSave={onSave}
            onTest={onTest}
            onDeploy={onDeploy}
            setWorkFlowName={setWorkFlowName}
            workFlowName={workFlowName}
            savedWorkflowName={workflow}
          />
          <Background
            variant={BackgroundVariant.Dots}
            gap={10}
            // color={'#f1f1f1'}
            id="1"
          />
          {/* <Background
            variant={BackgroundVariant.Lines}
            gap={100}
            color={'#ccc'}
            id="2"
          /> */}

          <Controls className="mb-20" />

          <Panel
            position=""
            className="absolute left-0 top-20 w-52 rounded-md bg-white shadow-md p-6 ">
            <header className="mb-2">Node Components</header>
            <div className="flex flex-col flex-wrap gap-1">
              {nodeComponents.map((node) => (
                <div
                  key={node.type}
                  className="rounded-md border border-gray-300 bg-white-0 p-1 text-sm hover:border-gray-400"
                  draggable
                  onDragStart={(e) => onDragStart(e, node?.type)}>
                  {node.label}
                </div>
              ))}
            </div>
          </Panel>
          {selectedNode && (
            <SideModal>
              {selectedNode?.type === Chat?.chatTrigger && (
                <ChatTriggerForm node={selectedNode} key={selectedNode.id} />
              )}
              {selectedNode?.type === Chat?.sendMessage && (
                <SendMessageForm node={selectedNode} key={selectedNode.id} />
              )}
              {selectedNode?.type === Chat?.buttonsInput && (
                <ButtonsInputForm
                  node={selectedNode}
                  setNode={setSelectedNode}
                  nodes={nodes}
                  setNodes={setNodes}
                  edges={edges}
                  setEdges={setEdges}
                  key={selectedNode.id}
                />
              )}
              {selectedNode?.type === Chat?.feedback && (
                <FeedbackNodeForm
                  node={selectedNode}
                  setNode={setSelectedNode}
                  nodes={nodes}
                  setNodes={setNodes}
                  edges={edges}
                  setEdges={setEdges}
                  key={selectedNode.id}
                />
              )}

              {selectedNode?.type === Chat?.collectInput && (
                <CollectInputForm node={selectedNode} key={selectedNode.id} />
              )}
              {selectedNode?.type === Chat?.collectFile && (
                <CollectFileForm node={selectedNode} key={selectedNode.id} />
              )}
              {selectedNode?.type === Chat?.api && (
                <ApiNodeForm node={selectedNode} key={selectedNode.id} />
              )}
            </SideModal>
          )}
          {test && (
            <Panel position="bottom-right">
              <TestBot
                chatNodes={transformNodes(nodes, edges)
                  ?.filter((ele) => ele?.type !== Chat?.button)
                  ?.map((node) => {
                    return {
                      id: node?.id,
                      from: Chat?.bot,
                      type: node?.type,
                      data: node?.data,
                    };
                  })}
              />
            </Panel>
          )}
        </ReactFlow>
      </div>
    </>
  );
}
export default ChatbotFlow;
