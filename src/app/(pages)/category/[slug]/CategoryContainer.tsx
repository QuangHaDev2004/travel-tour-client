"use client";
import { useState } from "react";
import { TourItem } from "@/types/tour";
import { CityItem } from "@/types/city";
import { CategoryDetail } from "@/types/category";
import { Filter } from "@/components/filter/Filter";
import { TourResult } from "@/components/tour/TourResult";
import { useCategoryTourList } from "@/hooks/useTourList";
import { Pagination } from "@/components/pagination/pagination";

export const CategoryContainer = ({
  slug,
  cityList,
  categoryDetail,
}: {
  slug: string;
  cityList: CityItem[];
  categoryDetail: CategoryDetail;
}) => {
  const [filterActive, setFilterActive] = useState(false);
  const { data, isLoading } = useCategoryTourList({ slug });
  const tourList: TourItem[] = data?.tourList ?? [];
  const pagination = data?.pagination;
  const totalRecord = data?.pagination?.totalRecord ?? 0;

  return (
    <>
      <div className="py-[45px] sm:py-[60px]">
        <div className="container">
          <div className="flex gap-[23px]">
            <Filter
              cityList={cityList}
              filterActive={filterActive}
              setFilterActive={setFilterActive}
            />

            <div className="flex-1">
              <h2 className="text-travel-primary mb-2.5 text-2xl font-semibold capitalize sm:text-[28px]">
                {categoryDetail.name}
              </h2>
              <div
                className="text-travel-gray-900 mb-2.5 text-justify text-sm font-normal sm:mb-4"
                dangerouslySetInnerHTML={{
                  __html: categoryDetail.description,
                }}
              ></div>

              <TourResult
                tourList={tourList}
                isLoading={isLoading}
                setFilterActive={setFilterActive}
                totalRecord={totalRecord}
              />

              {pagination && <Pagination pagination={pagination} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
