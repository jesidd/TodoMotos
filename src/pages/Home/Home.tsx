import { useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";
import ArticleCard from "../../components/Blog/ArticleCard";
import type { ClassMoto } from "../../components/Blog/ArticleData";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SyncLoader, PuffLoader } from "react-spinners";

const Home: React.FC = () => {
  const [ref, inView] = useInView();

  const fetchDataBlog = async ({ pageParam }: { pageParam: number }) => {
    const res = await axios.get(
      `https://fachamotos-1.onrender.com/api/Bike/paged?pageNumber=${pageParam}&pageSize=6`
    );
    return res.data;
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

  console.log(data);

  const content = data?.pages.map((page: ClassMoto[]) =>
    page.map((article: ClassMoto, i: number) => {
      if (page.length == i + 1) {
        return (
          <ArticleCard
            articleData={article.bike}
            key={article.bike.id}
            innerRef={ref}
          />
        );
      }
      return <ArticleCard articleData={article.bike} key={article.bike.id} />;
    })
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <Header />
      <div className="h-auto w-full bg-white mt-[200px]">
        <Banner />

        <div className="flex justify-center flex-wrap w-[90%] md:w-[80%] lg:w-[70%] relative pt-30 pb-15 gap-10 mx-auto">
          {status === "pending" ? (
            <PuffLoader className="absolute top-2"
              color={"#000000"}
              loading={true}
              cssOverride={{}}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : status === "error" ? (
            ""
          ) : (
            content
          )}
          {isFetchingNextPage && (
            <div className="w-full flex justify-center">
              <SyncLoader
                color={"#000000"}
                loading={true}
                cssOverride={{}}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
