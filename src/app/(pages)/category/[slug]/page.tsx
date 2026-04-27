import { getCityList } from "@/services/city";
import { CategoryContainer } from "./CategoryContainer";
import { getCategoryTourList } from "@/services/category";
import { BreadCrumb } from "@/components/breadcrumb/BreadCrumb";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { cityList } = await getCityList();
  const { breadcrumb, categoryDetail } = await getCategoryTourList(slug);

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <CategoryContainer
        slug={slug}
        cityList={cityList}
        categoryDetail={categoryDetail}
      />
    </>
  );
}
