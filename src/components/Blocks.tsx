import React, { useEffect, useState } from "react";
import fetch from "cross-fetch";
import { Typography } from "@mui/material";

type Props = {
  url: string;
};

type Loader = {
  show: boolean;
  msg: string;
};

type Block = {
  id: number;
  text: string;
};

const Blocks: React.FC<Props> = ({ url }) => {
  const [loader, setLoader] = useState<Loader>({
    show: false,
    msg: "",
  });

  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    setLoader({ show: true, msg: "Loading data... please wait a moment" });

    const getBlocks = async (url: string) => {
      try {
        const response = await fetch(`${url}/api/v1/blocks`);
        const objectData = await response.json();

        setBlocks(
          objectData.data.reduce((acc: Block[], cur: any) => {
            // console.log(cur);
            acc.push({ text: cur.attributes.data, id: parseInt(cur.id) });
            return acc;
          }, [])
        );
        setLoader({ show: false, msg: "" });
      } catch (error) {
        alert("There is an Error, please contact carloscruz@gmail.com");
        console.log(error);
      }
    };

    getBlocks(url);
  }, [url]);

  return (
    <>
      {loader.show ? (
        <Typography> {loader.msg} </Typography>
      ) : (
        <Typography>
          {blocks.map((block, iBlock) => {
            return (
              <div key={iBlock} className="datablock">
                <Typography className="id">
                  {" "}
                  {block.id.toString().padStart(3, "0")}{" "}
                </Typography>
                <Typography> {block.text} </Typography>
              </div>
            );
          })}
        </Typography>
      )}
    </>
  );
};

export default Blocks;
