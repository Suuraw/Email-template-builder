import React from "react";
import axios from "axios";
import Spinner from "./spinner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTemplateStore } from "../store/templateStore";
import { Block } from "./Block";
const queryPara = localStorage.getItem("queryPara");
export function Canvas() {
  const {
    currentTemplate,
    reorderBlocks,
    setCurrentTemplate,
    viewMode,
    setSelectedBlockId,
  } = useTemplateStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => {
    const fetchTemplateContent = async () => {
      try {
        const URL = `https://email-template-builder-backend-gc5d.onrender.com/api/getTemplate/${queryPara}`;
        const response = await axios.get(URL);
        if (response.status !== 200)
          throw new Error("Network response was not ok");
        console.log(response.data.template);
        const templateData = response.data.template;
        setCurrentTemplate(templateData);
      } catch (error) {
        console.error("Failed to fetch template:", error);
      }
    };
    fetchTemplateContent();
  }, [setCurrentTemplate]);

  const handleDragEnd = ({
    active,
    over,
  }: {
    active: { id: string };
    over: { id: string } | null;
  }) => {
    if (!over || active.id === over.id || !currentTemplate) return;

    const oldIndex = currentTemplate.blocks.findIndex(
      (block) => block.id === active.id
    );
    const newIndex = currentTemplate.blocks.findIndex(
      (block) => block.id === over.id
    );

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedBlocks = arrayMove(
        currentTemplate.blocks,
        oldIndex,
        newIndex
      );
      reorderBlocks(updatedBlocks); // Update state with reordered blocks
    }
  };

  const canvasWidthClass =
    viewMode === "mobile"
      ? "max-w-sm"
      : viewMode === "tablet"
      ? "max-w-lg"
      : "max-w-2xl";

  if (!currentTemplate) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="flex-1 bg-gray-100 p-8 overflow-auto"
      onClick={() => setSelectedBlockId(null)}
    >
      <div
        className={`${canvasWidthClass} mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300`}
      >
        <div className="p-8">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentTemplate.blocks.map((block) => block.id)} // Pass an array of IDs
              strategy={verticalListSortingStrategy}
            >
              {currentTemplate.blocks.map((block) => (
                <Block key={block.id} block={block} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
