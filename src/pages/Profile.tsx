import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '../components';
import { bonusCard } from '../assets';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { isAuthenticated, logout, user } = useAuth0();

  return (
    <Container className="grid lg:grid-cols-[20%_1fr] gap-14 lg:gap-10 mt-20">
      <div>
        <ul className="flex lg:flex-col gap-6">
          <li>
            <a href="#" className="text-dark">
              Main
            </a>
          </li>
          <li>
            <a href="#" className="text-gray hover:text-dark">
              Information
            </a>
          </li>
          <li>
            <a href="#" className="text-gray hover:text-dark">
              Order history
            </a>
          </li>
          <li>
            {isAuthenticated ? (
              <button
                onClick={() => logout()}
                className="text-gray hover:text-dark"
              >
                Logout
              </button>
            ) : (
              <Link to="/signin" className="text-gray hover:text-dark">
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div>
        <h2 className="capitalize mb-9">Hello, {user?.name || 'Guest'}!</h2>

        <div className="w-[335px] h-[242px] bg-gray2 mb-9">
          <img src={bonusCard} alt="" className="pt-5" />
          <div className="px-5 pt-4 pb-5">
            <ul className="flex flex-col gap-3">
              <li className="flex justify-between">
                <span>Bonus card</span> <span>250 points</span>
              </li>
              <li className="flex justify-between text-gray">
                <span>Cashback</span> <span>5%</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="mb-8">Recent orders</h4>

          <table className="profile__table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Order</th>
                <th>Date</th>
                <th>Summary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>849234</td>
                <td>
                  Jacket KLS Black M, Trousers KLS Black M, Shirt KLS White M
                </td>
                <td>20.09.2022</td>
                <td>€180</td>
                <td className="text-green">Paid</td>
              </tr>
              <tr>
                <td>835012</td>
                <td>Short KLS Graphit S, Jacket KLS Graphite M</td>
                <td>19.09.2021</td>
                <td>€340</td>
                <td className="text-green">Delivered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
