
import React from 'react';

interface Specification {
  name: string;
  value: string;
}

interface ProductSpecificationsTabProps {
  specifications: Specification[];
}

const ProductSpecificationsTab: React.FC<ProductSpecificationsTabProps> = ({ specifications }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <tbody>
          {specifications.map((spec, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border border-gray-200 px-4 py-3 font-medium">{spec.name}</td>
              <td className="border border-gray-200 px-4 py-3">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecificationsTab;
