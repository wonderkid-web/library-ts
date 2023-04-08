const page = async () => {
  const URL_API = "https://api-berita-indonesia.vercel.app/cnbc/terbaru/";
  const getBerita = async () => {
    const res = await fetch(URL_API);
    const data = await res.json();
    return data;
  };
  const berita = await getBerita();
  return (
    <ul className="grid grid-cols-2 gap-8 mt-4 place-items-center">
      {berita.data.posts.map((post: any, index: string) => {
        return (
          <li
            className="border cursor-pointer bg-slate-50 shadow-lg text-black rounded-md  w-5/6  flex flex-col"
            key={index}
          >
            <h1 className="font-bold text-white h-full w-full p-4 bg-emerald-700 text-xl">
              {post.title}
            </h1>
            <img className="" src={post.thumbnail} />
            <p className="m-4 truncate">{post.description}</p>
            <button className="text-white p-2 rounded-md font-bold text-center  bg-emerald-700 w-fit m-4">
              <a href={post.link}>Baca Selengkapnya</a>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default page;
