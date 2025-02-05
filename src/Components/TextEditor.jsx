import React, { useCallback, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Button, Container, Paper, Typography, Select, MenuItem } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TextEditor = () => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Image,
      Link.configure({ openOnClick: true }),
      Highlight,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TextStyle,
    ],
    content: "<p>Start typing...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleExportPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.text("Document Export", 10, 10);
    const plainText = content.replace(/<[^>]+>/g, "");
    doc.text(plainText, 10, 20);
    doc.save("document.pdf");
  }, [content]);

  return (
    <Container sx={{ pb: 4, top:0, height: "100vh", width:"100vw" }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Advanced Word Processor
        </Typography>
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <Select
            defaultValue="Normal"
            onChange={(e) => editor.chain().focus().setParagraph().run()}
          >
            <MenuItem value="Normal">Normal text</MenuItem>
            <MenuItem value="Heading1">Heading 1</MenuItem>
            <MenuItem value="Heading2">Heading 2</MenuItem>
          </Select>
          <Select
            defaultValue="Arial"
            onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          >
            <MenuItem value="Arial">Arial</MenuItem>
            <MenuItem value="Times New Roman">Times New Roman</MenuItem>
            <MenuItem value="Courier New">Courier New</MenuItem>
          </Select>
          <Button onClick={() => editor.chain().focus().toggleBold().run()} variant="contained">B</Button>
          <Button onClick={() => editor.chain().focus().toggleItalic().run()} variant="contained"><i>I</i></Button>
          <Button onClick={() => editor.chain().focus().toggleUnderline().run()} variant="contained"><u>U</u></Button>
          <Button onClick={() => editor.chain().focus().toggleStrike().run()} variant="contained"><s>S</s></Button>
          <Button onClick={() => editor.chain().focus().setTextAlign("left").run()} variant="contained">Align Left</Button>
          <Button onClick={() => editor.chain().focus().setTextAlign("center").run()} variant="contained">Align Center</Button>
          <Button onClick={() => editor.chain().focus().setTextAlign("right").run()} variant="contained">Align Right</Button>
        </div>
        <div
          style={{
            minHeight: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <EditorContent editor={editor} />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportPDF}
          sx={{ mt: 2 }}
        >
          Export as PDF
        </Button>
      </Paper>
    </Container>
  );
};

export default TextEditor;
