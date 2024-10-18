import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonComparative = () => {
  return (
    <>
      <h2 className="text-center text-lg font-light  dark:text-grey-light">
        <Skeleton className="w-full h-10 rounded-sm" />
      </h2>
      <div className="flex items-center gap-6  w-3/5 mx-auto justify-between font-bold text-2xl">
        {/* <Image
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="btc"
                            width={40}
                            height={40}
                        /> */}

        <Skeleton className="w-full h-10 rounded-sm" />

        <Skeleton className="w-full h-10 rounded-sm" />

        <Skeleton className="w-full h-10 rounded-sm" />
      </div>
      <div className="w-4/5 mx-auto flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="w-full h-10 rounded-sm" />
          </div>

          <Skeleton className="w-full h-10 rounded-sm" />
        </div>

        <div className="flex justify-between items-center">
          {/* <div className='w-1/2'>
                        <Progress variant="last" value={20} /> 
                    </div> */}
          <div>
            {/* <Image
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="btc"
                            width={20}
                            height={20}
                        /> */}

            <Skeleton className="w-full h-10 rounded-sm" />
          </div>

          <Skeleton className="w-full h-10 rounded-sm" />
        </div>

        <div className="flex justify-center items-center">
          <Skeleton className="w-full h-10 rounded-sm" />
        </div>

        <div className="flex justify-center gap-4 items-center">
          {/* <div className='w-1/2'>
                        <Progress variant="progress" value={35} /> 
                    </div> */}

          <Skeleton className="w-full h-10 rounded-sm" />
        </div>

        <div></div>
      </div>
    </>
  );
};

export default SkeletonComparative;
