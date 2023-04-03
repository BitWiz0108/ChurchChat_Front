import HeaderComp from "../components/HeaderComp";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { chatCompletion } from "../api/chat.api";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Stack, Box, FormControl, OutlinedInput, CircularProgress } from "@mui/material";
import TypewriterComp  from "../components/TypeWriterComp";


const messageType = {
  answer: "answer",
  question: "question"
};

const HomePage = () => {

  const inputRef = useRef();
  const chatWrapperRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const getAnswer = async () => {
    if (onRequest) return;

    const newMessages = [...messages, {
      type: messageType.question,
      content: question
    }];

    setMessages(newMessages);
    setQuestion("");

    const { response, err } = await chatCompletion({ prompt: question });
    if (response) {
      setMessages([...newMessages, {
        type: messageType.answer,
        content: response.text
      }]);
    }

    if (err) {
      toast.error(err.message);
      setOnRequest(false);
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) getAnswer();
  };
  useEffect(() => {
    setTimeout(() => {
      chatWrapperRef.current.addEventListener("DOMNodeInserted", e => {
        e.currentTarget.scroll({
          top: e.currentTarget.scrollHeight,
          behavior: "smooth"
        });
      });
    }, 200);
  }, []);

  return (
    <Stack alignItems="center" justifyContent="space-between" sx={{ height: "100%" }} >
      <HeaderComp></HeaderComp>
      <Box ref={chatWrapperRef} sx={{ height: "100%", position: "fixed", zIndex: 1, maxWidth: "md", width: "100%", overflowY: "auto", paddingTop: "60px", paddingBottom: "90px", "&::-webkit-scrollbar": { width: "0px" } }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: "md", width: "100%" }}>
          {messages.map((item, index) => (
            <Box key={index} padding={1}>
              <Box sx={{ padding: 2, bgcolor: item.type === messageType.answer && "#2f2f2f", borderRadius: 3 }}>
                {index === messages.length - 1 ? (
                  item.type === messageType.answer ? (
                    <TypewriterComp text={item.content}></TypewriterComp>
                  ) : item.content
                ) : (
                  item.content
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Stack width="100%" alignItems="center" justifyContent="center" borderTop="1px solid #2c2c2c" bgcolor="#000" zIndex={3} >
        <Box padding={2} width="100%" maxWidth="md" > <FormControl fullWidth variant="outlined">
          <OutlinedInput inputRef={inputRef} sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }} endAdornment={onRequest ? (<CircularProgress size="1.5rem" />) : (<SendOutlinedIcon />)}
            autoFocus disabled={onRequest} onKeyUp={onEnterPress} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask something..." />
        </FormControl>
        </Box>
      </Stack>
    </Stack>
  );
};

export default HomePage;