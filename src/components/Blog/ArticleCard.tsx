import type React from "react"
import type { Moto } from "./ArticleData"


export default function ArticleCard({ articleData, innerRef }: { articleData: Moto, innerRef?:  React.Ref<HTMLElement> }) {
    return (
        <article ref={innerRef}>
            <div className="flex flex-col w-full md:w-70 lg:w-65  min-h-[509px] rounded-[15px] overflow-hidden shadow-xl">
                <a href="#"><img src="https://www.honda.es/content/dam/central/motorcycles/street/cb750-hornet-2025/overview/image-gallery/honda-cb750-image-gallery-08-desktop-1728x972-image6.jpg/jcr:content/renditions/fb_r_w.webp" alt="foto articulo" className="object-cover" /></a>
                <div className="flex flex-col gap-5 px-8 pt-10 pb-5">
                    <h3 className="text-[18px] font-[700] text-[#4e4e4e] leading-[1.1]"><a href="#">{articleData.marca} {articleData.modelo} con {articleData.cilindrajeCC}cc</a></h3>
                    <div>
                        <p className="inline-block text-[12px] text-[#777777]">Honda sigue en plena renovación de su lineup y presenta la reemplazante de la CB500F, que estaba discontinuada, con la llegada de esta Hornet.</p>
                    </div>
                </div>
                <div className="mt-auto break-words border-t-1 border-t-gray-200 px-8 py-2.5 text-[11px] text-[#ADADAD] gap-2">
                    <span className="mr-2">
                        martes 10 junio, 2025
                    </span>
                    -
                    <span className="ml-2">
                        18 comentarios
                    </span>
                </div>
            </div>
        </article>
    )
}
