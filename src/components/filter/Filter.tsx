"use client";
import { CityItem } from "@/types/city";
import { FiFilter } from "react-icons/fi";
import { filterPrice } from "@/constants/filter";
import { useTourFilter } from "@/hooks/useTourFilter";
import { DatePickerCalendar } from "../ui/DatePickerCalendar";
/**
 * Component Filter cung cấp giao diện lọc Tour đa điều kiện.
 * * @author QuangHaDev - 02.12.2025
 */
export const Filter = ({
  cityList,
  filterActive,
  setFilterActive,
}: {
  cityList: CityItem[];
  filterActive: boolean;
  setFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { filters, handleApplyFilter, handleResetFilter, handleUpdateFilter } =
    useTourFilter();

  return (
    <>
      <div
        className={`w-1/4 lg:block ${filterActive ? "fixed inset-0 z-[998] block h-full w-full" : "hidden"}`}
      >
        <div
          style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
          className={`flex h-fit flex-col gap-[15px] rounded-[10px] bg-white p-[15px] ${filterActive ? "relative z-[1] h-full w-[280px] rounded-none" : "w-full"}`}
        >
          <div className="flex items-center justify-between">
            <div className="text-travel-primary text-lg font-semibold">
              Bộ Lọc
            </div>
            <button>
              <FiFilter className="text-travel-primary size-6" />
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <label
              htmlFor="price"
              className="text-travel-secondary/80 text-sm font-semibold"
            >
              Ngân sách
            </label>
            <select
              value={filters.price}
              onChange={(e) => handleUpdateFilter("price", e.target.value)}
              className="select border-travel-secondary/20 text-travel-secondary w-full rounded-md border bg-white px-3 text-sm font-medium"
            >
              <option
                value=""
                className="hover:bg-travel-primary rounded-sm bg-white py-2 hover:text-white"
              >
                Tất cả
              </option>
              {filterPrice.map((price) => (
                <option
                  key={price.id}
                  value={price.value}
                  className="hover:bg-travel-primary rounded-sm bg-white py-2 hover:text-white"
                >
                  {price.label}
                </option>
              ))}
            </select>
          </div>

          {cityList && cityList.length > 0 && (
            <>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="locationsFrom"
                  className="text-travel-secondary/80 text-sm font-semibold"
                >
                  Điểm đi
                </label>
                <select
                  value={filters.locationFrom}
                  onChange={(e) =>
                    handleUpdateFilter("locationFrom", e.target.value)
                  }
                  className="select border-travel-secondary/20 text-travel-secondary w-full rounded-md border bg-white px-3 text-sm font-medium"
                >
                  <option className="hover:bg-travel-primary rounded-sm bg-white py-2 hover:text-white">
                    Tất cả
                  </option>
                  {cityList.map((city) => (
                    <option
                      key={city.id}
                      value={city.id}
                      className="hover:bg-travel-primary rounded-sm bg-white py-2 hover:text-white"
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="locationTo"
                  className="text-travel-secondary/80 text-sm font-semibold"
                >
                  Điểm đến
                </label>
                <select
                  value={filters.locationTo}
                  onChange={(e) =>
                    handleUpdateFilter("locationTo", e.target.value)
                  }
                  className="select border-travel-secondary/20 text-travel-secondary rounded-md border bg-white px-3 text-sm font-medium"
                >
                  <option className="hover:bg-travel-primary rounded-sm bg-white py-2 hover:text-white">
                    Tất cả
                  </option>
                  {cityList.map((city) => (
                    <option
                      key={city.id}
                      value={city.id}
                      className="hover:bg-travel-primary rounded-sm bg-white py-2 hover:text-white"
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex flex-col gap-[5px]">
            <label
              htmlFor="departureDate"
              className="text-travel-secondary/80 text-sm font-semibold"
            >
              Ngày khởi hành
            </label>
            <DatePickerCalendar
              value={filters.departureDate}
              onChange={(value: string) =>
                handleUpdateFilter("departureDate", value)
              }
              className="border-travel-secondary/20 placeholder:text-travel-secondary h-10 w-full rounded-md border px-3 text-sm font-medium"
            />
          </div>

          <button
            onClick={handleApplyFilter}
            className="border-travel-primary bg-travel-primary hover:text-travel-primary h-10 cursor-pointer rounded-md border text-sm font-medium text-white capitalize transition-all duration-300 hover:bg-white"
          >
            Áp Dụng
          </button>
          <button
            onClick={handleResetFilter}
            className="border-travel-red text-travel-red hover:bg-travel-red/10 h-10 cursor-pointer rounded-md border bg-white text-sm font-medium capitalize"
          >
            Xóa bộ lọc
          </button>
        </div>

        {/* Overlay */}
        <div
          onClick={() => setFilterActive(false)}
          className={`bg-travel-overlay fixed inset-0 h-full w-full ${filterActive ? "block" : "hidden"}`}
        ></div>
      </div>
    </>
  );
};
