interface Categories {
  id?: number | undefined;
  name?: string ;
  parent_category_id?: number;
  children?: Categories[] | undefined;
  brands?: brands[] | undefined | any;
  prevActiveCategories?: Categories[]
}

interface brands {
  id?: number | undefined;
  name?: string | undefined;
}

interface brandsProps {
  brands: brands[];
}

interface CategoryListProps {
  categories: Categories[];
  setActiveContentOnHover: any; //ฟังก์ชัน
}

interface SubCategoryListProps {
  categories: Categories[];
  activeContent: number; //id ที่ active
}

export type { Categories, CategoryListProps, SubCategoryListProps, brandsProps, brands };
