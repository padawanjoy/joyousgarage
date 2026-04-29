import type { ComponentProps } from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const mdxComponents = {
  a: (props: ComponentProps<"a">) => {
    const href = props.href ?? "#";
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return <a {...props} target="_blank" rel="noreferrer" />;
    }
    return <Link href={href} {...(props as Omit<ComponentProps<"a">, "href">)} />;
  },
  pre: (props: ComponentProps<"pre">) => <CodeBlock {...props} />,
  code: ({ children, ...rest }: ComponentProps<"code">) => {
    // rehype-pretty-code adds data-language to block code; let it pass through.
    if ("data-language" in rest) return <code {...rest}>{children}</code>;
    return <code className="prose-inline-code" {...rest}>{children}</code>;
  },
};
