import ContainerView from "@components/atoms/ContainerView";
import Spacer from "@components/atoms/Spacer";
import { endOfDecade } from "date-fns/esm";
import { marked } from "marked";
import { Text, View } from "react-native";
import Blockquote from "./components/Blockquote";
import CodeBlock from "./components/CodeBlock";
import CodeSpan from "./components/CodeSpan";
import Heading from "./components/Heading";
import Hr from "./components/Hr";
import ImageMD from "./components/Image";
import Italic from "./components/Italic";
import Link from "./components/Link";
import List from "./components/List";
import Paragraph from "./components/Paragraph";
import Strikethrough from "./components/Strikethrough";
import Strong from "./components/Strong";
import TextMD from "./components/TextMD";

const toReact = (tokens: marked.Token[], isStart = false): any[] => {
    return tokens.map((token) => {
        if (token.type == "heading")
            return <Heading key={Math.random()} token={token} />;
        else if (token.type == "text")
            return <TextMD key={Math.random()} token={token} />;
        else if (token.type == "em")
            return <Italic key={Math.random()} token={token} />;
        else if (token.type == "strong")
            return <Strong key={Math.random()} token={token} />;
        else if (token.type == "paragraph")
            return <Paragraph key={Math.random()} token={token} />;
        else if (token.type == "br" || token.type == "space")
            return <Spacer key={Math.random()} size="medium" />;
        else if (token.type == "hr") return <Hr key={Math.random()} />;
        else if (token.type == "codespan")
            return <CodeSpan key={Math.random()} token={token} />;
        else if (token.type == "list")
            return <List key={Math.random()} token={token} />;
        else if (token.type == "link")
            return <Link key={Math.random()} token={token} />;
        else if (token.type == "code")
            return <CodeBlock key={Math.random()} token={token} />;
        else if (token.type == "del")
            return <Strikethrough key={Math.random()} token={token} />;
        else if (token.type == "blockquote")
            return <Blockquote key={Math.random()} token={token} />;
        else if (token.type == "image")
            return <ImageMD key={Math.random()} token={token} />;
    });
};
export default toReact;
