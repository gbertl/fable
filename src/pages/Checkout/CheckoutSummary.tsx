import { Button, Input } from '../../components';
import { useGetCartTotal } from '../../hooks';

const CheckoutSummary = () => {
  const total = useGetCartTotal();

  return (
    <div className="md:w-[65%] mt-16 md:ml-auto">
      <ul className="mb-6">
        <li className="flex justify-between text-xs mb-2">
          Summary: <span>₱{total}</span>
        </li>
        <li className="flex justify-between text-xs mb-2">
          Delivery: <span>₱0</span>
        </li>
        <li className="flex justify-between text-xs mb-2">
          Promocode: <span>₱0</span>
        </li>
      </ul>

      <p className="flex justify-between text-xl font-medium mb-3">
        Total: <span>₱{total}</span>
      </p>

      <div className="form-group flex flex-col md:flex-row">
        <Input type="text" placeholder="Enter promocode" />
        <Button>Apply</Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
