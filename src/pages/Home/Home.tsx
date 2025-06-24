import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";
import ArticleCard from "../../components/Blog/ArticleCard";
import type { ResponseDataBlog } from "../../components/Blog/Blog.types";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoaderCircle from "../../components/Loaders/CircleLoader";
import PointsLoader from "../../components/Loaders/PointsLoader";

const Home: React.FC = () => {
  const [ref, inView] = useInView();

  const fetchDataBlog = async ({ pageParam }: { pageParam: number }) => {
    try {
      const res = await axios.get(
        `https://fachamotos-1.onrender.com/api/Blog/with-comments?pageNumber=${pageParam}&pageSize=8`
      );
      return res.data; // si todo está bien, devuelve los datos
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Si no hay más páginas, devuelve array vacío o estructura controlada
        return [];
      }
    }
  };

  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["Blog"],
      queryFn: fetchDataBlog,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.length ? allPages.length + 1 : undefined;
        return nextPage;
      },
    });

  const content = data?.pages.map((page: ResponseDataBlog[]) =>
    page.map((article: ResponseDataBlog, i: number) => {
      if (page.length == i + 1) {
        return (
          <ArticleCard
            articleData={article}
            key={article.blog.id}
            innerRef={ref}
          />
        );
      }
      return <ArticleCard articleData={article} key={article.blog.id} />;
    })
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("fire");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  console.log(data);

  return (
    <>
      <Header />
      <div className="relative h-auto w-full bg-white top-[164px] overflow-auto scrollbar-hidden">
        <Banner />

        <div className="flex justify-start flex-wrap w-[90%] lg:w-[86.7%] md:w-[80%] gap-12 relative pt-30 pb-15 mx-auto">
          {status === "pending" ? (
            <LoaderCircle />
          ) : status === "error" ? (
            "Error"
          ) : (
            content
          )}
          {isFetchingNextPage && <PointsLoader />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
