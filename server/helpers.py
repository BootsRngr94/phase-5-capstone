def get_pool_visits(technician):
    if technician:
        pool_visits = [visit.to_dict() for visit in technician.pool_visits]
        return pool_visits
    else:
        return []

def get_assigned_pools(technician):
    # Implement logic to retrieve assigned pools for the technician
    if technician:
        assigned_pools = [pool_visit.pool.to_dict() for pool_visit in technician.pool_visits]
        return assigned_pools
    else:
        return []

def get_related_clients(technician):
    # Assuming you have a relationship between Technician and Client
    return [client.to_dict() for client in technician.clients]

# def get_related_client(technician):
#     # Implement logic to retrieve related client information for the technician
#     if technician and technician.clients:
#         related_client = technician.clients[0].to_dict()  # assuming the technician has at least one client
#         return related_client
#     else:
#         return None