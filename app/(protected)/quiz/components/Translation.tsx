import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect } from "react";

const Translation = ({
  setTranslation,
}: {
  setTranslation: React.Dispatch<
    React.SetStateAction<{
      enable: boolean;
      sourceLanguage: string;
      targetLanguage: string;
    }>
  >;
}) => {
  const [enable, setEnable] = React.useState(false);

  const [languagesData, setLanguagesData] = React.useState<{ code: string; name: string; targets: string[] }[]>([]);
  const [sourceLanguage, setSourceLanguage] = React.useState<{ code: string; name: string }>();
  const [targetLanguage, setTargetLanguage] = React.useState<{ code: string; name: string }>();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_TRANSLATION_API}/languages`);
      if (!res.ok) {
        throw new Error("Failed to fetch languages");
      }
      const data = await res.json();
      setLanguagesData(data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (sourceLanguage && targetLanguage) {
      setTranslation((prev) => ({ ...prev, sourceLanguage: sourceLanguage.code, targetLanguage: targetLanguage.code }));
    }
  }, [sourceLanguage, targetLanguage]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        <Switch
          id="translation"
          checked={enable}
          onCheckedChange={(checked) => {
            setEnable(checked);
            setTranslation((prev) => ({ ...prev, enable: checked }));
          }}
        />
        <Label htmlFor="translation">Enable Translation</Label>
      </div>
      <p className="text-xs text-muted-foreground">Enable translation for your quiz</p>

      <div className={`flex items-center space-x-2 mt-2 h-0 overflow-hidden ${enable ? "h-auto" : ""} `}>
        <Select onValueChange={(value) => setSourceLanguage(languagesData.find((language) => language.code === value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Source Language" />
          </SelectTrigger>
          <SelectContent>
            {languagesData.map((language) => (
              <SelectItem key={language.code} value={language.code}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          disabled={!sourceLanguage}
          onValueChange={(value) => setTargetLanguage(languagesData.find((language) => language.code === value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Target Language" />
          </SelectTrigger>
          <SelectContent>
            {languagesData.map((language) => (
              <SelectItem key={language.code} value={language.code}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Translation;
