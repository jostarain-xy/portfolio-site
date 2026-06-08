export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-[9990] h-20 w-20 group">
      {/* 默认微信小按钮 */}
      <button
        aria-label="打开微信联系方式"
        className="absolute bottom-0 right-0 flex h-16 w-16 items-center justify-center border border-white/30 bg-white/10 text-white backdrop-blur-xl transition-all duration-500 ease-out group-hover:scale-75 group-hover:translate-y-3 group-hover:opacity-0 group-hover:blur-sm"
      >
        <img
          src="/images/WeChat_logo.png"
          alt="微信"
          className="h-7 w-7 object-contain"
        />
      </button>

      {/* hover 后展开二维码卡片 */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-72 origin-bottom-right translate-y-6 scale-75 rounded-2xl border border-white/30 bg-[#071017]/90 p-6 text-center opacity-0 blur-md shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:blur-0">
        <div className="mx-auto mb-5 flex h-40 w-40 items-center justify-center bg-white p-2">
          <img
            src="/images/wechat.png"
            alt="微信联系二维码"
            className="h-full w-full object-contain"
          />
        </div>

        <h3 className="text-2xl font-semibold text-white">WeChat</h3>

        <p className="mt-4 text-base leading-7 text-slate-300">
          扫描二维码，通过微信联系我。
        </p>

        <p className="mt-5 text-lg font-semibold text-white underline underline-offset-4">
          添加微信
        </p>
      </div>
    </div>
  );
}