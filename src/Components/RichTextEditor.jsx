import React, { useState, useEffect, useRef } from 'react';
import {
  Divider,
  IconButton,
  Paper,
  Select,
  MenuItem,
  Tooltip,
  Box,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';

import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
} from 'lucide-react';

const RichTextEditor = () => {
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Arial');
  const editorRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fonts = ['Arial', 'Times New Roman', 'Calibri', 'Courier New'];
  const fontSizes = ['12', '14', '16', '18', '20', '24', '28', '32'];

  // Remove the initial focus setup as it's causing issues
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleFontChange = (event) => {
    setFontFamily(event.target.value);
    document.execCommand('fontName', false, event.target.value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
    document.execCommand('fontSize', false, event.target.value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleInput = (e) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
  };

  // Rest of your toolbar rendering functions remain the same
  const renderToolbarGroup1 = () => (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Select
        size="small"
        value={fontFamily}
        onChange={handleFontChange}
        sx={{ 
          minWidth: isMobile ? 90 : 120,
          fontSize: isMobile ? '0.875rem' : '1rem'
        }}
      >
        {fonts.map((font) => (
          <MenuItem key={font} value={font}>
            {font}
          </MenuItem>
        ))}
      </Select>

      <Select
        size="small"
        value={fontSize}
        onChange={handleFontSizeChange}
        sx={{ 
          minWidth: isMobile ? 60 : 70,
          fontSize: isMobile ? '0.875rem' : '1rem'
        }}
      >
        {fontSizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );

  // Your other toolbar groups remain the same
  const renderToolbarGroup2 = () => (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Tooltip title="Bold">
        <IconButton size="small" onClick={() => handleFormat('bold')}>
          <Bold size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Italic">
        <IconButton size="small" onClick={() => handleFormat('italic')}>
          <Italic size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Underline">
        <IconButton size="small" onClick={() => handleFormat('underline')}>
          <Underline size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  const renderToolbarGroup3 = () => (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Tooltip title="Align Left">
        <IconButton size="small" onClick={() => handleFormat('justifyLeft')}>
          <AlignLeft size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Center">
        <IconButton size="small" onClick={() => handleFormat('justifyCenter')}>
          <AlignCenter size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Right">
        <IconButton size="small" onClick={() => handleFormat('justifyRight')}>
          <AlignRight size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  const renderToolbarGroup4 = () => (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Tooltip title="Bullet List">
        <IconButton size="small" onClick={() => handleFormat('insertUnorderedList')}>
          <List size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Numbered List">
        <IconButton size="small" onClick={() => handleFormat('insertOrderedList')}>
          <ListOrdered size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  const renderToolbarGroup5 = () => (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Tooltip title="Insert Link">
        <IconButton 
          size="small"
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) {
              document.execCommand('createLink', false, url);
              editorRef.current?.focus();
            }
          }}
        >
          <Link size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Insert Image">
        <IconButton 
          size="small"
          onClick={() => {
            const url = prompt('Enter image URL:');
            if (url) {
              document.execCommand('insertImage', false, url);
              editorRef.current?.focus();
            }
          }}
        >
          <Image size={isMobile ? 16 : 20} />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  return (
    <Box 
      sx={{ 
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 0.5, sm: 1 },
          borderRadius: 0,
          borderBottom: 1,
          borderColor: 'divider',
          flexShrink: 0
        }}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={1}
          alignItems="center"
          divider={
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                mx: { sm: 0.5, md: 1 }
              }} 
            />
          }
          sx={{ 
            p: { xs: 0.5, sm: 1 },
            '& > *': { flexShrink: 0 }
          }}
        >
          {renderToolbarGroup1()}
          {renderToolbarGroup2()}
          {renderToolbarGroup3()}
          {renderToolbarGroup4()}
          {renderToolbarGroup5()}
        </Stack>
      </Paper>

      <Box 
        sx={{ 
          flexGrow: 1,
          height: '100%',
          overflow: 'hidden',
          backgroundColor: '#fff'
        }}
      >
        <Box
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          sx={{
            height: '100%',
            padding: '16px',
            overflowY: 'auto',
            outline: 'none',
            '&:empty:before': {
              content: '"Start typing..."',
              color: 'gray',
              fontStyle: 'italic'
            }
          }}
          style={{
            direction: 'ltr',
            unicodeBidi: 'bidi-override',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}
        />
      </Box>
    </Box>
  );
};

export default RichTextEditor;