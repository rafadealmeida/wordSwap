import { IconButton, Stack, Tooltip } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface Props {
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCopy: () => void;
  generateDoc: () => Promise<void>
  generatePDF: () => Promise<void>
}

export const ToolBarFile: React.FC<Props> = ({ handleFile, handleCopy ,generateDoc, generatePDF}) => {
  return (
    <Stack direction="row" spacing={1} >
      <Tooltip title="Trocar arquivo">
        <IconButton component="label">
          <UploadFileIcon fontSize="medium" sx={{color:'white'}}/>
          <input
            hidden
            type="file"
            id="file"
            accept=".doc, .docx"
            onChange={handleFile}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copiar texto">
        <IconButton onClick={handleCopy} sx={{color:'white'}}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Baixar documento">
        <IconButton onClick={generateDoc} sx={{color:'white'}}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>
      {/* <Tooltip title="Baixar Pdf">
        <IconButton onClick={generatePDF} sx={{color:'white'}}>
          <DownloadForOfflineIcon />
        </IconButton>
      </Tooltip> */}
    </Stack>
  );
};
