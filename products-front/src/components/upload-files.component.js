import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, withStyles } from '@material-ui/core';
import UploadService from "../services/upload-files.service";
import FlashMessage from './FlashMessage'

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
    };
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(error => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
          isError: true
        });
        console.log(error);
      });

    this.setState({
      selectedFiles: undefined,
      message: "Upload was successfully!"
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      isError
    } = this.state;
    
    return (
      <div className="mg20">
        {currentFile && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
          </Box>)
        }

        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            onChange={this.selectFile} />
          <Button
            className="btn-choose"
            variant="outlined"
            style={{width: '300px'}}
            component="span" >
            <div className="file-name">
              {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : "Anexar Arquivo .json"}
            </div>
          </Button>
        </label>&nbsp;&nbsp;&nbsp;
        <Button
          className="btn-upload"
          variant="contained"
          color='primary'
          disabled={!selectedFiles}
          onClick={this.upload}>
          Enviar
        </Button>

        {
          message ? <FlashMessage message={message} severity={isError} /> : '' 
        }

      </div >
    );
  }
}
