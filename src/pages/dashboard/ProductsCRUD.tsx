
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProductCRUD from '@/components/products/ProductCRUD';

const ProductsCRUD = () => {
  return (
    <DashboardLayout title="Gestion des produits">
      <ProductCRUD />
    </DashboardLayout>
  );
};

export default ProductsCRUD;
