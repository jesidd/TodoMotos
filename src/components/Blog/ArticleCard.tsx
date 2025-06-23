import type React from "react"
import type { ResponseDataBlog } from "./Blog.types"
import { format } from "date-fns";
import { es } from "date-fns/locale";


export default function ArticleCard({ articleData, innerRef }: { articleData: ResponseDataBlog, innerRef?:  React.Ref<HTMLElement> }) {
    const fechaFormateada = format(new Date(articleData.blog.fechaPublicacion), "EEEE d MMMM, yyyy", {
        locale: es,
    });
    return (
        <article ref={innerRef} className="w-full md:w-70 lg:w-65">
            <div className="flex flex-col w-full min-h-[509px] rounded-[15px] overflow-hidden shadow-xl">
                <a href="#"><img src={articleData.blog.imagenUrl} alt="foto articulo" className="h-48 md:h-40 object-cover w-full" /></a>
                <div className="flex flex-col gap-5 px-8 pt-10 pb-5">
                    <h3 className="text-[18px] font-[700] text-[#4e4e4e] leading-[1.1]"><a href="#">{articleData.blog.titulo}</a></h3>
                    <div>
                        <p className="inline-block text-[12px] text-[#777777]">{articleData.blog.resumen}</p>
                    </div>
                </div>
                <div className="mt-auto break-words border-t-1 border-t-gray-200 px-8 py-2.5 text-[11px] text-[#ADADAD] gap-2">
                    <span className="mr-2">
                       {fechaFormateada}
                    </span>
                    -
                    <span className="ml-2">
                        {articleData.comentarios.length} comentarios
                    </span>
                </div>
            </div>
        </article>
    )
}
