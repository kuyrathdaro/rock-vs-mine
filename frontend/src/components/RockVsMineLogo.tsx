import React from 'react';
import rock from '../assets/rock.svg';
import mine from '../assets/mine.svg';

const RockVsMineLogo: React.FC = () => (
  <div className="flex items-center space-x-4">
    <img src={rock} alt="Rock" className="h-10 w-10" />
    <span className="text-2xl font-bold text-black">vs</span>
    <img src={mine} alt="Mine" className="h-10 w-10" />
  </div>
);

export default RockVsMineLogo;