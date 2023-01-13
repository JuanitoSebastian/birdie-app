import { exportForTesting } from "../services/drones";
import { DroneDictionary, BaseDroneSighting } from "../types/interfaces";

describe('DroneService', () => {

  const drones = (): DroneDictionary => {
    return {
      'SN-sn0OY7s8U7': {
        serialNumber: 'SN-sn0OY7s8U7',
        latestViolation: {
          positionY: 270000,
          positionX: 230000,
          distanceToNestMeters: 28.28427,
          timestamp: '2023-01-13T17:07:01.081Z'
        },
        closestViolation: {
          positionY: 270000,
          positionX: 230000,
          distanceToNestMeters: 28.28427,
          timestamp: '2023-01-13T17:07:01.081Z'
        }
      },
      'SN-rah10RDgBl': {
        serialNumber: 'SN-rah10RDgBl',
        latestViolation: {
          positionX: 256297.0063481793,
          positionY: 193725.27169080795,
          timestamp: '2023-01-13T17:15:49.502Z',
          distanceToNestMeters: 56.62594224577982
        },
        closestViolation: {
          positionX: 231295.1052955217,
          positionY: 222524.13163575556,
          timestamp: '2023-01-13T17:15:45.499Z',
          distanceToNestMeters: 33.23847812814101
        }
      }
    };
  };

  const droneSightingNew: BaseDroneSighting = {
    serialNumber: 'SN-h5swlyevvn',
    positionX: 165898.39427898685,
    positionY: 211732.79569017387,
    timestamp: new Date().toISOString(),
    distanceToNestMeters: 92.3984
  };

  const droneSightingAlreadySeenFar: BaseDroneSighting = {
    serialNumber: 'SN-rah10RDgBl',
    positionX: 165898.39427898685,
    positionY: 211732.79569017387,
    timestamp: new Date().toISOString(),
    distanceToNestMeters: 92.3984
  };

  const droneSightingAlreadySeenClose: BaseDroneSighting = {
    serialNumber: 'SN-rah10RDgBl',
    positionX: 237160.66500547522,
    positionY: 242263.50050995237,
    distanceToNestMeters: 14.990061622993275,
    timestamp: new Date().toISOString(),
  };


  describe('updateDronesWithViolations', () => {

    test('Sighting of an unseen drone create new Drone', () => {
      const updatedDrones = exportForTesting.updateDronesWithViolations(drones(), [droneSightingNew]);
      const addedDrone = updatedDrones[droneSightingNew.serialNumber];

      expect(addedDrone).not.toBeUndefined();
      expect(addedDrone.serialNumber).toBe(droneSightingNew.serialNumber);
      expect(addedDrone.latestViolation.timestamp).toBe(droneSightingNew.timestamp);
      expect(addedDrone.closestViolation.timestamp).toBe(droneSightingNew.timestamp);
    });

    test('Sighting of an already seen drone updates the Drone latest sighting', () => {
      const updatedDrones = exportForTesting.updateDronesWithViolations(drones(), [droneSightingAlreadySeenFar]);
      const updatedDrone = updatedDrones[droneSightingAlreadySeenFar.serialNumber];

      expect(updatedDrone).not.toBeUndefined();
      expect(updatedDrone.latestViolation.timestamp).toBe(droneSightingAlreadySeenFar.timestamp);
      expect(updatedDrone.latestViolation.positionX).toBe(droneSightingAlreadySeenFar.positionX);
      expect(updatedDrone.latestViolation.positionY).toBe(droneSightingAlreadySeenFar.positionY);
      expect(updatedDrone.latestViolation.distanceToNestMeters).toBe(droneSightingAlreadySeenFar.distanceToNestMeters);
    });

    test('A closer sighting of an already seen drone updates the Drone latest sighting and close violation', () => {
      const updatedDrones = exportForTesting.updateDronesWithViolations(drones(), [droneSightingAlreadySeenClose]);
      const updatedDrone = updatedDrones[droneSightingAlreadySeenClose.serialNumber];

      expect(updatedDrone).not.toBeUndefined();
      expect(updatedDrone.latestViolation.timestamp).toBe(droneSightingAlreadySeenClose.timestamp);
      expect(updatedDrone.latestViolation.positionX).toBe(droneSightingAlreadySeenClose.positionX);
      expect(updatedDrone.latestViolation.positionY).toBe(droneSightingAlreadySeenClose.positionY);
      expect(updatedDrone.latestViolation.distanceToNestMeters).toBe(droneSightingAlreadySeenClose.distanceToNestMeters);

      expect(updatedDrone.closestViolation.timestamp).toBe(droneSightingAlreadySeenClose.timestamp);
      expect(updatedDrone.closestViolation.positionX).toBe(droneSightingAlreadySeenClose.positionX);
      expect(updatedDrone.closestViolation.positionY).toBe(droneSightingAlreadySeenClose.positionY);
      expect(updatedDrone.closestViolation.distanceToNestMeters).toBe(droneSightingAlreadySeenClose.distanceToNestMeters);
    });

  });

  describe('removeDronesWithSightingsOlderThan', () => {
    test('Drones with latest sighting older than given timespan are removed', () => {
      const updatedDrones = exportForTesting.removeDronesWithSightingsOlderThan(drones(), 60);
      const updatedDronesArray = Object.values(updatedDrones);
      expect(updatedDronesArray.length).toBe(0);
    });

    test('Drones with latest sighting newer than timespan are not removed', () => {
      const dronesDict = exportForTesting.updateDronesWithViolations(drones(), [droneSightingNew]);
      const updatedDrones = exportForTesting.removeDronesWithSightingsOlderThan(dronesDict, 60);
      const updatedDronesArray = Object.values(updatedDrones);
      expect(updatedDronesArray.length).toBe(1);
    });
  });

});