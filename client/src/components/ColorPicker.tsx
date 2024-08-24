import React, { useState, useRef, useEffect } from "react";
import { FaPalette } from "react-icons/fa";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const colorOptions = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#F1948A",
  "#82E0AA",
  "#85C1E9",
  "#FF4757",
  "#2ED573",
  "#5352ED",
  "#FF6B81",
  "#1E90FF",
  "#FFA502",
  "#FF6348",
  "#747D8C",
  "#2F3542",
  "#70A1FF",
  "#3742FA",
  "#2F3640",
  "#8C7AE6",
  "#FFC312",
  "#C4E538",
  "#12CBC4",
  "#FDA7DF",
  "#ED4C67",
  "#F79F1F",
  "#A3CB38",
];

const ColorPicker: React.FC<ColorPickerProps> = React.memo(
  ({ color, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const colorPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          colorPickerRef.current &&
          !colorPickerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative" ref={colorPickerRef}>
        <button
          className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaPalette className="text-white w-4 h-4 m-auto" />
        </button>
        {isOpen && (
          <div
            className="absolute z-10 left-0 mt-2 p-2 bg-white rounded-md shadow-lg"
            style={{ width: "200px" }}
          >
            <div className="grid grid-cols-6 gap-1">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  className="w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    onChange(c);
                    setIsOpen(false);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ColorPicker;
