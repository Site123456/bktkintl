"use client";

import { useEffect, useRef } from "react";

export default function PdfFullHeight({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPdf = async () => {
      // Use the legacy build (v4 compatible with workers)
      const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

      // Point to the worker in /public
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

      const loadingTask = pdfjs.getDocument(src);
      const pdf = await loadingTask.promise;

      const container = containerRef.current;
      if (!container) return;

      container.innerHTML = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        if (cancelled) return;

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        container.appendChild(canvas);

        await page.render({
          canvasContext: context,
          viewport,
          canvas, // required in v4+
        }).promise;
      }
    };

    loadPdf();

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className="w-full bg-white flex flex-col items-center">
      <div
        ref={containerRef}
        className="w-full max-w-[900px] flex flex-col gap-8 py-10"
      />
    </div>
  );
}
