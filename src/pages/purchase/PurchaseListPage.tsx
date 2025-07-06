import { useState, useEffect } from "react";
import CategoryFilter from "../../components/purchase/CategoryFilter";
import ProductCard from "../../components/purchase/ProductCard";
import { getFundingList, type FundingItem } from "../../apis/purchase";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { mockCategories } from "../../data/tempMocks";
import { useNavigate } from "react-router-dom";

const PurchaseListPage = () => {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState<FundingItem[]>([]);
  const [carouselProducts, setCarouselProducts] = useState<FundingItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getFundingList();
        // API 응답(FundingSimpleItem)을 어플리케이션 모델(FundingItem)으로 매핑합니다.
        const mappedProducts: FundingItem[] = productList.map((p) => ({
          ...p,
          id: p.id,
          description: "", // 상세 정보는 상세 페이지에서 별도 조회하므로 기본값 설정
          placeType: p.placeType ?? "장소 정보 없음",
          currentCount: p.currentCount ?? 0,
          currentPrice: p.currentPrice ?? 0,
          imageUrl: p.image,
        }));

        setProducts(mappedProducts);
        // 캐러셀에는 2개만 보여줍니다.
        setCarouselProducts(mappedProducts.slice(0, 2));
      } catch (error) {
        console.error("상품 목록을 불러오는데 실패했습니다:", error);
        alert("상품 목록을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      }
    };

    fetchProducts();
  }, []);

  const prevSlide = () => {
    if (carouselProducts.length === 0) return;
    setCurrent(current === 0 ? carouselProducts.length - 1 : current - 1);
  };
  const nextSlide = () => {
    if (carouselProducts.length === 0) return;
    setCurrent(current === carouselProducts.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="bg-white pb-16">
      <div className="p-4 sticky top-0 bg-white z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="원하는 제품을 검색해보세요!"
            className="w-full bg-gray-100 border-none rounded-lg py-3 pl-4 pr-10 focus:ring-2 focus:ring-[#538E79] focus:outline-none text-sm"
          />
          <FiSearch
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button className="p-2 border rounded-full">
            <VscSettings size={16} />
          </button>
          <button className="px-4 py-1.5 border rounded-full text-sm">
            장소 ⌵
          </button>
          <button className="px-4 py-1.5 border rounded-full text-sm">
            가격 ⌵
          </button>
          <button className="px-4 py-1.5 border rounded-full text-sm">
            모인 수량 ⌵
          </button>
        </div>
      </div>

      {carouselProducts.length > 0 && (
        <div className="relative h-44 mx-4 overflow-hidden">
          {carouselProducts.map((product, index) => (
            <div
              key={product.id}
              onClick={() => navigate(`/purchase/${product.id}`)}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 cursor-pointer ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative w-full h-full bg-gray-100 rounded-lg p-4 flex flex-col justify-between">
                <div className="relative z-10">
                  <p className="font-bold text-lg text-[#538E79]">
                    {product.currentCount}명 참여
                  </p>
                  <h3 className="font-bold text-xl">{product.name}</h3>
                  <p className="font-semibold text-gray-800">
                    현재 가격: {product.currentPrice.toLocaleString()}원
                  </p>
                  <p className="text-sm text-gray-500">{product.placeType}</p>
                </div>
                <img
                  src={product.imageUrl || product.image}
                  alt={product.name}
                  className="absolute right-0 bottom-0 w-40 h-40 object-contain"
                />
                <div className="absolute bottom-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded-full z-10">
                  {current + 1}/{carouselProducts.length}
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-1 rounded-full shadow-md z-20"
          >
            <IoIosArrowBack size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-1 rounded-full shadow-md z-20"
          >
            <IoIosArrowForward size={18} />
          </button>
        </div>
      )}

      <div className="px-4 pt-8 pb-6">
        <h2 className="text-lg font-bold mb-4">
          어느 장소에 제품이 필요하세요?
        </h2>
        <CategoryFilter categories={mockCategories} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              imageUrl: product.imageUrl || product.image || "",
              currentPrice: product.currentPrice,
              location: product.placeType,
              participants: product.currentCount,
              maxParticipants: product.maxCount,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PurchaseListPage;
