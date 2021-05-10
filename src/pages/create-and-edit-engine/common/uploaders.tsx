import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Event } from "effector";
import { IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

type ImageUploaderViewProps = {
  value:
    | (File & {
        preview: string;
      })
    | null;

  onChange: Event<
    | (File & {
        preview: string;
      })
    | null
  >;

  reset: Event<void>;
};

export const ImageUploaderView = ({ value, onChange, reset }: ImageUploaderViewProps) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onChange(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = value && (
    <div style={thumb} key={value.name}>
      <div style={thumbInner}>
        <img src={value.preview} style={img} />
        <IconButton
          onClick={() => reset()}
          aria-label="delete engine image"
          style={{ height: "24px", padding: 0, position: "relative", left: "-30px", top: "5px" }}
        >
          <CloseIcon color="action" />
        </IconButton>
      </div>
    </div>
  );

  return (
    <section style={{ width: "250px", height: "250px" }}>
      {value === null ? (
        <div {...getRootProps({ style })}>
          <AddIcon fontSize="large" color="action" />
          <input {...getInputProps()} />
          <Typography align="center">
            Нажмите или перетащите, чтобы загрузить изображение двигателя
          </Typography>
        </div>
      ) : (
        <>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </>
      )}
    </section>
  );
};

type FilesUploaderViewProps = {
  value: File[] | null;
  onChange: Event<File[] | null>;
  reset: Event<void>;
};

export const FilesUploaderView = ({ value, onChange, reset }: FilesUploaderViewProps) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
    },
  });

  const acceptedFileItems = value?.map((file) => (
    <Typography
      key={file.name}
      style={{
        marginTop: "8px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "150px",
      }}
    >
      {file.name}
    </Typography>
  ));

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div style={{ height: "100%", display: "flex", width: "100%" }}>
      {value === null || value.length === 0 ? (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <AddIcon fontSize="large" color="action" />
          <Typography align="center">
            Нажмите или перетащите, чтобы загрузить файлы для двигателя
          </Typography>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography align="center">Удалить загруженные файлы</Typography>
          <IconButton onClick={() => reset()} aria-label="delete engine image">
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
      )}

      <div style={{ margin: "0 20px" }}>
        <Typography variant="h6">Принятые файлы</Typography>
        <div>{acceptedFileItems}</div>
      </div>
    </div>
  );
};

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const thumb: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,

  marginBottom: 8,
  marginRight: 8,
  height: "100%",
  padding: 4,
  boxSizing: "border-box",
};

const img: React.CSSProperties = {
  display: "block",
  height: "250px",
  width: "250px",
  border: "1px solid #eaeaea",
  objectFit: "contain",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const baseStyle = {
  flex: 1,
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  height: "100%",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
