import type {FC} from "react";
import PropTypes from "prop-types";
import type {DropzoneOptions, FileWithPath} from "react-dropzone";
import {useDropzone} from "react-dropzone";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    SvgIcon,
    Tooltip,
    Typography
} from "@mui/material";
import {FileIcon} from "./file-icon";
import {bytesToSize} from "@/utils/bytes-to-size";

export type File = FileWithPath;

interface FileDropzoneProps extends DropzoneOptions {
    caption?: string;
    files?: File[];
    onRemove?: (file: File) => void;
    onRemoveAll?: () => void;
    onUpload?: () => void;
}

export const FileDropzone: FC<FileDropzoneProps> = (props) => {
    const {caption, files = [], onRemove, onRemoveAll, onUpload, ...other} = props;
    const {getRootProps, getInputProps, isDragActive} = useDropzone(other);

    const hasAnyFiles = files.length > 0;

    return (
        <div>
            {!hasAnyFiles && <Box
                sx={{
                    alignItems: "center",
                    border: 1,
                    borderRadius: 1,
                    borderStyle: "dashed",
                    borderColor: "divider",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    outline: "none",
                    p: 6,
                    ...(
                        isDragActive && {
                            backgroundColor: "action.active",
                            opacity: 0.5
                        }
                    ),
                    "&:hover": {
                        backgroundColor: "action.hover",
                        cursor: "pointer",
                        opacity: 0.5
                    }
                }}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                >
                    <Avatar
                        sx={{
                            height: 64,
                            width: 64
                        }}
                    >
                        <SvgIcon>
                            <Upload01Icon/>
                        </SvgIcon>
                    </Avatar>
                    <Stack spacing={1}>
                        <Typography
                            sx={{
                                "& span": {
                                    textDecoration: "underline"
                                }
                            }}
                            variant="h6"
                        >
                            <span>Click to upload</span> or drag and drop
                        </Typography>
                        {caption && (
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {caption}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </Box>}
            {hasAnyFiles && (
                <Box>
                    <List>
                        {files.map((file) => {
                            const extension = file.name.split(".").pop();

                            return (
                                <ListItem
                                    key={file.path}
                                    sx={{
                                        border: 1,
                                        px: 3,
                                        py: 2,
                                        borderColor: "divider",
                                        borderRadius: 1,
                                        "& + &": {
                                            mt: 1
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <FileIcon extension={extension}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={file.name}
                                        primaryTypographyProps={{variant: "subtitle2"}}
                                        secondary={bytesToSize(file.size)}
                                    />
                                    <Tooltip title="Remove">
                                        <IconButton
                                            edge="end"
                                            onClick={() => onRemove?.(file)}
                                        >
                                            <SvgIcon>
                                                <XIcon/>
                                            </SvgIcon>
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            );
                        })}
                    </List>
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{mt: 3}}
                    >
                        {/*<Button*/}
                        {/*    color="inherit"*/}
                        {/*    onClick={onRemoveAll}*/}
                        {/*    size="small"*/}
                        {/*    type="button"*/}
                        {/*>*/}
                        {/*    Remove All*/}
                        {/*</Button>*/}
                        <Button
                            onClick={onUpload}
                            // size="small"
                            type="button"
                            variant="contained"
                        >
                            Continue
                        </Button>
                    </Stack>
                </Box>
            )}
        </div>
    );
};

FileDropzone.propTypes = {
    caption: PropTypes.string,
    files: PropTypes.array,
    onRemove: PropTypes.func,
    onRemoveAll: PropTypes.func,
    onUpload: PropTypes.func,
    // From Dropzone
    accept: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired),
    disabled: PropTypes.bool,
    getFilesFromEvent: PropTypes.func,
    maxFiles: PropTypes.number,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    noClick: PropTypes.bool,
    noDrag: PropTypes.bool,
    noDragEventsBubbling: PropTypes.bool,
    noKeyboard: PropTypes.bool,
    onDrop: PropTypes.func,
    onDropAccepted: PropTypes.func,
    onDropRejected: PropTypes.func,
    onFileDialogCancel: PropTypes.func,
    preventDropOnDocument: PropTypes.bool
};
