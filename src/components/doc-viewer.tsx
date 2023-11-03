import * as React from "react";
import {FC, useState} from "react";
import {
    MinimalButton,
    PdfJs,
    Position,
    RenderPageProps,
    SpecialZoomLevel,
    Tooltip,
    Viewer,
    ViewMode
} from "@react-pdf-viewer/core";
import {FlagKeyword, NextIcon, PreviousIcon, searchPlugin} from "@react-pdf-viewer/search";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";
import {pdfjs} from "react-pdf";
import {Card, OutlinedInput} from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

interface DocViewerProps {
    fileUrl: string;
}

export const DocViewer: FC<DocViewerProps> = (props) => {
    const { fileUrl } = props;
    const [currentKeyword, setCurrentKeyword] = useState<FlagKeyword>({
        keyword: '',
        matchCase: false,
        wholeWords: false,
    });
    const searchPluginInstance = searchPlugin();
    const { highlight, jumpToNextMatch, jumpToPreviousMatch } = searchPluginInstance;

    const search = async (keyword: FlagKeyword) => {
        setCurrentKeyword(keyword);
        highlight(keyword);
    };

    const handleDocumentLoad = () => {
        // search({
        //     keyword: "",
        //     // matchCase: currentKeyword.matchCase,
        //     // wholeWords: currentKeyword.wholeWords,
        // })
    }

    return (
        <Card sx={{height: '85vh'}}>
            <div
                className="rpv-core__viewer"
                style={{
                    // border: '1px solid rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        padding: '8px',
                    }}
                >
                    <OutlinedInput
                        fullWidth
                        placeholder="Search this document..."
                        value={currentKeyword.keyword}
                        onChange={(e) => {
                            setCurrentKeyword({
                                keyword: e.target.value,
                                matchCase: currentKeyword.matchCase,
                                wholeWords: currentKeyword.wholeWords,
                            });
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && currentKeyword.keyword) {
                                highlight(currentKeyword);
                            }
                        }}
                    />
                    <div style={{ padding: '0 2px' }}>
                        <Tooltip
                            position={Position.BottomCenter}
                            target={
                                <MinimalButton onClick={jumpToPreviousMatch}>
                                    <PreviousIcon />
                                </MinimalButton>
                            }
                            content={() => 'Previous match'}
                            offset={{ left: 0, top: 8 }}
                        />
                    </div>
                    <div style={{ padding: '0 2px' }}>
                        <Tooltip
                            position={Position.BottomCenter}
                            target={
                                <MinimalButton onClick={jumpToNextMatch}>
                                    <NextIcon />
                                </MinimalButton>
                            }
                            content={() => 'Next match'}
                            offset={{ left: 0, top: 8 }}
                        />
                    </div>
                </div>
                <div
                    style={{
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Viewer
                        theme={'dark'}
                        defaultScale={SpecialZoomLevel.PageWidth}
                        viewMode={ViewMode.SinglePage}
                        fileUrl={fileUrl}
                        onDocumentLoad={handleDocumentLoad}
                        plugins={[searchPluginInstance]}
                    />
                </div>
            </div>
        </Card>

    );
}
