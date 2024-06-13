
const ProductItem = () => {
  return (
    <div className="flex flex-col gap-2">
        <div className="rounded-lg">
            <img className="w-full h-full rounded-lg object-cover" src="https://cdn-i.vtcnews.vn/upload/2023/09/11/zunfffigdz46ogxnuyku-15074951.png" alt="image" />
        </div>
        <div className="flex flex-col">
            <div className="font-bold">24.700.000đ</div>
            <div className="text-text-1 text-[14px] font-medium">
                Xe máy SH 2022
            </div>
            <div className="text-text text-[12px]">HỘI MUA XE MÁY CŨ GIÁ RẺ</div>
        </div>
    </div>
  )
}

export default ProductItem