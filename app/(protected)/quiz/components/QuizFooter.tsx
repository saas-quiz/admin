import Link from "next/link";
import React from "react";

const QuizFooter = ({
  data,
  editable,
}: {
  data: {
    footerHeading1: string;
    footerHeading2: string;
    footerText1: string;
    footerText2: string;
    footerLink: string;
  };
  editable?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 mt-20">
      {data.footerHeading1 ? (
        <h1 className="text-2xl md:text-3xl font-semibold">{data.footerHeading1}</h1>
      ) : (
        editable && (
          <div className="h-fit rounded-md bg-gray-100 text-gray-400 text-2xl md:text-3xl font-semibold px-2">Heading 1</div>
        )
      )}
      {data.footerHeading2 ? (
        <h1 className="text-xl md:text-2xl font-medium">{data.footerHeading2}</h1>
      ) : (
        editable && (
          <div className="h-fit rounded-md bg-gray-100 text-gray-400 text-xl md:text-2xl font-medium px-2">Heading 2</div>
        )
      )}
      {data.footerText1 ? (
        <p className="text-sm font-medium">{data.footerText1}</p>
      ) : (
        editable && <div className="h-fit rounded-md bg-gray-100 text-gray-400 text-sm font-medium px-2">Text 1</div>
      )}
      {data.footerText2 ? (
        <p className="text-sm font-medium">{data.footerText2}</p>
      ) : (
        editable && <div className="h-fit rounded-md bg-gray-100 text-gray-400 text-sm font-medium px-2">Text 2</div>
      )}
      {data.footerLink ? (
        <Link href={data.footerLink} className="text-sm">
          {data.footerLink}
        </Link>
      ) : (
        editable && <div className="h-fit rounded-md bg-gray-100 text-gray-400 text-sm px-2">Link</div>
      )}
    </div>
  );
};

export default QuizFooter;
