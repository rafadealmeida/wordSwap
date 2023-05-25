export interface ResponseText {
  data: {
    keys: string[];
    conteudo: string;
    mensagem?: string;
    status: number
  };
}

export interface FileObj {
  name: string;
  lastModified: number;
  webkitRelativePath?: String;
  size: number;
  type: string;
}
