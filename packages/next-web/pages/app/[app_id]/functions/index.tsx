/****************************
 * cloud functions index page
 ***************************/

import React, { useEffect } from "react";
import { Button, HStack } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import clsx from "clsx";

import { SiderBarWidth } from "@/constants/index";

import DebugPanel from "./mods/DebugPannel";
import DependecyList from "./mods/DependecePanel";
import FunctionList from "./mods/FunctionPanel";

import useFunctionStore from "./store";

import commonStyles from "./index.module.scss";
import FileStatusIcon, { FileStatus } from "@/components/FileStatusIcon";
import FileTypeIcon, { FileType } from "@/components/FileTypeIcon";

function FunctionPage() {
  const { initFunctionPage, currentFunction } = useFunctionStore((store) => store);

  useEffect(() => {
    initFunctionPage();

    return () => {};
  }, [initFunctionPage]);

  return (
    <>
      <div className="" style={{ width: 300, borderRight: "1px solid #eee" }}>
        <FunctionList />
        <DependecyList />
      </div>
      <div className="flex flex-1 flex-col ">
        <div style={{ borderBottom: "1px solid #efefef" }}>
          <div
            className={clsx(commonStyles.sectionHeader, "flex justify-between px-2 ")}
            style={{ marginBottom: 0 }}
          >
            <div className="flex items-center">
              <FileTypeIcon type={FileType.js} />
              <span className="font-bold text-base ml-2">
                {currentFunction?.label} &nbsp;({currentFunction?.name}.js)
              </span>
              <span className="ml-4 ">
                <FileStatusIcon status={FileStatus.deleted} />
              </span>
            </div>

            <HStack spacing="4">
              <span>
                <span className=" text-slate-500">调用地址：</span>
                <span>https://qcphsd.api.cloudendpoint.cn/deleteCurrentTodo</span>
              </span>
              <Button
                size="xs"
                borderRadius={2}
                colorScheme="blue"
                padding="0 12px"
                onClick={() => {
                  console.log("发布");
                }}
              >
                发布
              </Button>
            </HStack>
          </div>
        </div>
        <div className="flex-1">
          <Editor
            theme="vs-dark"
            options={{
              minimap: {
                enabled: false,
              },
              scrollbar: {
                verticalScrollbarSize: 6,
              },
              lineNumbersMinChars: 4,
              scrollBeyondLastLine: false,
            }}
            height="100%"
            defaultLanguage="javascript"
            value={currentFunction?.code}
          />
        </div>
        <div style={{ height: 300 }}>
          <DebugPanel />
        </div>
      </div>
    </>
  );
}

export default FunctionPage;
