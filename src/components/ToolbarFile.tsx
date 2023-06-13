import { IconButton, Stack, Tooltip } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';

interface Props {
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCopy: () => void;
  generateDoc: () => Promise<void>
}

export const ToolBarFile: React.FC<Props> = ({ handleFile, handleCopy ,generateDoc}) => {
  return (
    <Stack direction="row" spacing={1} >
      <Tooltip title="Trocar arquivo">
        <IconButton component="label">
          <AttachFileIcon fontSize="medium" sx={{color:'white'}}/>
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
    </Stack>
  );
};
